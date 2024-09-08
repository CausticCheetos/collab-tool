import Comments from  './Comments.tsx'
import './Task.css'

interface IComments {
    task_id: number;
    user_id: number;
    comment: string;
    rating: number;
    approval: boolean;
    date: string;
}

interface ITask {
    group_id: number;
    task_id: number;
    task_name: string;
    user_id: number;
    description: string;
    date: string;
    comments: IComments[];
}

interface UsersProps {
    id: number;
    name: string;
}

interface TaskProps {
    task: ITask;
    userList: UsersProps[];
}

const Tasks = ({task, userList} : TaskProps) =>{
    const date = new Date(task.date.replace(' ', 'T'));
    const dateString = date.toDateString();
    const dateTime = date.toLocaleTimeString();
    console.log(userList);

    const userName = userList.find((item, key) => {
        if(item.id == task.user_id){
            return userList[key]['name'];
        }
    })

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
                <span>
                    Created on {dateString} - {dateTime}
                </span>
                <span>
                    TaskID {task.task_id}
                </span>
            </div>
            <h4>
                Description
            </h4>
            <p>
                {task.description}
            </p>
            <div>
                Comments:
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
            </div>
        </div>   
        )
}

export default Tasks