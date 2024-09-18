import { useLocation, useNavigate } from "react-router-dom";
import groupService from '../services/groups.tsx'
import { useState } from "react";

const CreateGroup = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [courseID, setCourseID] = useState('');

    const userID = location.state.userID;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        groupService
            .createGroup(groupName, Number(courseID), userID)
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
            Create new group here!
            <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
                <label>Group Name</label>
                <input value={groupName} onChange={(e) => { setGroupName(e.target.value) }}/>
                <label>Course ID</label>
                <input value={courseID} onChange={(e) => { setCourseID(e.target.value) }}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default CreateGroup