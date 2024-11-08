import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header.tsx'
import groupService from '../services/groups.tsx'
import { useState } from "react";

const CreateTask = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const userID = location.state.userID;
    const groupID = location.state.groupID;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        groupService
            .createTask(userID, groupID, taskName, description)
            .then((res) =>{
                console.log(res);
                navigate("/");
            }).catch((error) =>{
                if(error.response){
                    console.log(error.response.data);
                }
            })
    }

    return(
        <div style={{width: '800px'}}> 
            <Header/>
            <h1>            
                Create New Task 
            </h1>
            <span>
                User <strong> {userID} </strong> from group <strong>{groupID}</strong>
            </span>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", rowGap: "10px"}}>
                    <label>Task Name</label>
                    <input value={taskName} onChange={(e) => { setTaskName(e.target.value) }}/>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => { setDescription(e.target.value) }}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask