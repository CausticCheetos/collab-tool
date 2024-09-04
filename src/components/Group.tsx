import './Group.css'
import Comments from  './Comments.tsx'
import groupService from '../services/groups.tsx'
import { useEffect, useState } from 'react';

interface GroupProps {
    id: number;
    name: string;
    groupID: number;
}

interface UsersProps {
    id: number;
    name: string;
}

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

const Group = ({id, name, groupID}: GroupProps) => {
    const [tasks, setTask] = useState<ITask[]>([]);
    const [userList, setUserList] = useState<UsersProps[]>([]);
    const [comments, setComments] = useState<IComments[]>([]);
    
    useEffect(() => {
        groupService
        .getGroupUserlistDetails(groupID)
        .then((response) => {
            setUserList(response.data);
            console.log(response.data);
        })

        groupService
        .getGroupTask(groupID)
        .then((response) =>{
            console.log(response.data);
            const taskList = response.data.map((val: ITask) =>{
                return val.task_id
            })
            console.log(taskList.toString());

            groupService
            .getAllComments(taskList.toString())
            .then((response) =>{
                console.log(response.data);
                setComments(response.data);
            })
            
            let results = response.data;
            results = results.map((value: ITask) =>{
                value["comments"] = [];
                comments.forEach((element) =>{
                    if(element.task_id == value['task_id']){
                        value["comments"].push(element);
                    }
                });
                return value;
            });

            console.log(results);
            
            setTask(results);
        })
      }, [comments, groupID])

    /* const tasks = [
        {
            "user_id": 2,
            "group_id": 100,
            "task_name": "Research",
            "description": "This involves research into bananas",
            "date": "10/04/2024", 
            "comments": [
                {
                    "user_id": 1,
                    "comment": "Great work!",
                    "rating": 10,
                    "date": "20/04/2024",
                    "approval": true,
                    "hidden_rating": false,
                    "hidden_comment": false,
                    "hidden_approval": false
                }
            ],
            "updates": [

            ]
        },
        {
            "user_id": 1,
            "group_id": 101,
            "task_name": "Development",
            "description": "Development of app",
            "date": "10/04/2024", 
            "comments": [
                {
                    "user_id": 1,
                    "comment": "Great work!",
                    "rating": 10,
                    "date": "20/04/2024",
                    "approval": true,
                    "hidden_rating": false,
                    "hidden_comment": false,
                    "hidden_approval": false
                },
                {
                    "user_id": 2,
                    "comment": "Could use some improvements!",
                    "rating": 10,
                    "date": "20/04/2024",
                    "approval": true,
                    "hidden_rating": false,
                    "hidden_comment": false,
                    "hidden_approval": false
                }
            ],
            "updates": [

            ]
        }
    ] */

    return(
        <div>
            <div>
                <h1>
                    {name}
                </h1>
            </div>
            Group Members
            <div className='userList'>
                {userList.map((elements) => {
                    return(
                        <div className='userIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                            <label>{elements.name}</label>
                        </div>
                    )
                })
                }
            </div>

            <div>
                Your task:
                
                {tasks.map((task) => {
                    if(task.user_id == id && task.group_id == groupID){
                        const date = new Date(task.date.replace(' ', 'T'));
                        const dateString = date.toDateString();
                        const dateTime = date.toLocaleTimeString();
                        return(
                            <div className='taskCard'>
                                <h3>
                                    {task.task_name}
                                </h3>
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
                                                    />
                                            </li>
                                        )}
                                    )}
                                    </ul>
                                </div>
                            </div>   
                           )
                    }
                })}
                {(()=>{
                    if(tasks.length == 0){
                        return(
                            <div>You have no tasks! Add one</div>
                        )
                    }
                })()}
            </div>
            <div>
                Others
                {tasks.map((task) => {
                    if(task.user_id != id && task.group_id == groupID){
                        const date = new Date(task.date.replace(' ', 'T'));
                        const dateString = date.toDateString();
                        const dateTime = date.toLocaleTimeString();
                        return(
                            <div className='taskCard'>
                                <h3>
                                    {task.task_name}
                                </h3>
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
                                                    />
                                            </li>
                                        )}
                                    )}
                                    </ul>
                                </div>
                            </div>   
                           )
                    }
                })}

            </div>

            <p>
                groupID: {groupID}
            </p>
        </div>
        
    )
}

export default Group