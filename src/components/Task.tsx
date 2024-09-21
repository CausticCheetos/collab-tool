import { useState } from 'react';
import Comments from  './Comments.tsx'
import groupService from '../services/groups.tsx'
import './Task.css'
import { useNavigate } from 'react-router-dom';

interface IComments {
    task_id: number;
    user_id: number;
    comment: string;
    rating: number;
    approval: boolean;
    date: string;
}

interface IStatuses{
    status_id: number;
    status: string;
}

interface ITask {
    group_id: number;
    task_id: number;
    task_name: string;
    user_id: number;
    description: string;
    date: string;
    status: number;
    comments: IComments[];
}

interface UsersProps {
    id: number;
    name: string;
}

interface TaskProps {
    id: number;
    task: ITask;
    userList: UsersProps[];
    statusList: IStatuses[];
}

const Tasks = ({id, task, userList, statusList} : TaskProps) =>{
    const navigate = useNavigate();

    const date = new Date(task.date.replace(' ', 'T'));
    const dateString = date.toDateString();
    const dateTime = date.toLocaleTimeString();
    const [isComment, setIsComment] = useState(false);
    const [isRate, setIsRate] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState("1");
    
    const getStatus = () => {
        const result = statusList.find((element) =>{
            return element.status_id == task.status
        })
        
        return result?.status;
    }

    const calculateRating = () =>{
        let average = 0;
        let total = 0;
        let result = 0;
        task.comments.forEach(item => {
            if(item.rating){
                total++;
                result += item.rating;
            }
        })
        average = result/total;        
        return(average)
    }

    const userName = userList.find((item, key) => {
        if(item.id == task.user_id){
            return userList[key]['name'];
        }
    })

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        let ratingScore = null;
        if(isRate){
            ratingScore = Number(rating);
        }

        groupService
            .createComment(id, task.task_id, comment, ratingScore)
            .then((response) => {
                console.log(response.status);
                navigate(0);
            })
    }

    return(
        <div className='taskCard'>
            <div>
                <div className='userTask'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    <strong>
                        {userName?.name}
                    </strong>
                </div>
                <h3>
                    {task.task_name}
                </h3>
            </div>
            
            <div className='taskDetails'>
                
                <div style={{display: "flex", justifyContent:"space-between"}}>
                    <span>
                        Created on {dateString} - {dateTime}
                    </span>
                    <span>
                        Status: {getStatus()}
                    </span>
                </div>

                <div style={{display: "flex", justifyContent:"space-between"}}>
                    <span>
                        Task ID <strong>{task.task_id}</strong>
                    </span>
                    <span>
                        {calculateRating() ? "Average rating: " + calculateRating() : "No Ratings"}
                    </span>
                </div>
            </div>
            <h4>
                Description
            </h4>
            <p>
                {task.description}
            </p>
            <div>
                <h4 style={{margin: "0"}}>
                    Comments
                </h4> 
                <hr/>
                <ul className='comments'>
                {task.comments.map(comment =>
                    {return(
                        <li>
                            <Comments 
                                userID={comment.user_id} 
                                contents={comment.comment}
                                date={comment.date}
                                approval={comment.approval}
                                rating={comment.rating}
                                />
                        </li>
                    )}
                )}
                </ul>
                {isComment ? 
                    <form className='commentForm' onSubmit={handleSubmit}>
                        <label>Comment</label>
                        <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}/>
                        <div>
                            Include rating
                            <input 
                                type='checkbox'
                                checked={isRate}
                                onChange={(e) => setIsRate(e.target.checked)}/>
                        </div>
                        <input 
                            className='slider'
                            type='range' 
                            min={0} 
                            max={2} 
                            value={rating}
                            step={0.01}
                            disabled={!isRate}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <div>
                            Rating: {rating} 
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                :null}
                {isComment ? 
                    <button onClick={() => setIsComment(!isComment)}>Cancel</button>:
                    <button onClick={() => setIsComment(!isComment)}>Add Comment</button>}
            </div>
        </div>   
        )
}

export default Tasks