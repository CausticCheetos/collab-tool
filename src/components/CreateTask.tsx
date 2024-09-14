import { useLocation, useNavigate } from "react-router-dom";
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
        <>
            Create task here! {userID} from group {groupID}
            <form onSubmit={onSubmit}>
                <label>Task Name</label>
                <input value={taskName} onChange={(e) => { setTaskName(e.target.value) }}/>
                <label>Description</label>
                <input value={description} onChange={(e) => { setDescription(e.target.value) }}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default CreateTask