import './Group.css'
import Tasks from './Task.tsx';
import groupService from '../services/groups.tsx'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface GroupProps {
    id: number;
    name: string;
    groupID: number;
    courseID: number;
    statusList: IStatuses[];
}

interface UsersProps {
    id: number;
    name: string;
    isAdmin: boolean;
}

interface IStatuses{
    status_id: number;
    status: string;
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
    status: number;
    comments: IComments[];
}

const Group = ({id, name, groupID, courseID, statusList}: GroupProps) => {
    const [tasks, setTask] = useState<ITask[]>([]);
    const [userList, setUserList] = useState<UsersProps[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    //const [comments, setComments] = useState<IComments[]>([]);
    
    useEffect(() => {
        groupService
        .getGroupUserlistDetails(groupID)
        .then((response) => {
            setUserList(response.data);
            console.log(response.data);
            const userDetails = response.data.find(((user: UsersProps) => user.id == id));
            if(userDetails.isAdmin){
                setIsAdmin(true);                
            }
        })

        groupService
        .getGroupTask(groupID)
        .then(async (response) =>{
            console.log(response.data);
            const taskList = response.data.map((val: ITask) =>{
                return val.task_id
            })
            console.log(taskList.toString());

            let results = response.data;
            groupService
            .getAllComments(taskList.toString())
            .then((response) =>{
                console.log(response.data);
                //setComments(response.data);
                const test = response.data;
                results = results.map((value: ITask) =>{
                    value["comments"] = [];
                    test.forEach((element: IComments) =>{
                        if(element.task_id == value['task_id']){
                            value["comments"].push(element);
                        }
                    });
                    return value;
                });
                console.log(results);
            
                setTask(results);
            })
        })
      }, [groupID])

    return(
        <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <div className='group'>
                <div className='groupDetails'>
                    <h1>
                        {name}
                    </h1>
                    <span>Group ID: {groupID}</span>
                    <span>Course ID: {courseID}</span>
                </div>
                <div>
                    Group Members
                    <div className='userList'>
                        {userList.map((elements) => {
                            return(
                                <div className='userIcon' title={"ID: " + elements.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                    <label>{elements.name} {elements.isAdmin ? "(ADMIN)" : ""}</label>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <div className='newTaskContainer'>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <button onClick={() => navigate("/newTask", {
                        state: {
                            userID: id,
                            groupID: groupID
                        }
                    })}>Create New Task</button>
                    {isAdmin ? 
                        <button 
                            onClick={() => navigate("/Admin", {
                                state: {
                                    groupName: name,
                                    groupID: groupID,
                                    courseID: courseID,
                                    userList: userList
                                }
                            })}
                            className='adminButton'>
                            Admin View
                        </button>: <></>}
                </div>
            </div>
            <h2>
            Your Task:
            </h2>
            <div className='tasksList'>
                {tasks.map((task) => {
                    if(task.user_id == id && task.group_id == groupID){
                        return(
                            <Tasks 
                                id={id} 
                                task={task} 
                                userList={userList} 
                                statusList={statusList}
                                isUser={true}/>
                        )
                    }
                })}
                {(()=>{
                    if(!tasks.some(element => element.user_id == id)){
                        return(
                            <div>
                                <strong>
                                    You have no tasks! Add one!
                                </strong>
                            </div>
                        )
                    }
                })()}
            </div>
            <h2>
            Other Members Task:
            </h2> 
            {(()=>{
                    if(!tasks.some(element => element.user_id != id)){
                        return(
                            <div>
                                <strong>
                                    There are no other tasks!
                                </strong>
                            </div>
                        )
                    }
                })()}
            <div className='tasksList'>
                {tasks.map((task) => {
                    if(task.user_id != id && task.group_id == groupID){
                        return(
                            <Tasks 
                                id={id} 
                                task={task} 
                                userList={userList} 
                                statusList={statusList}
                                isUser={false}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Group