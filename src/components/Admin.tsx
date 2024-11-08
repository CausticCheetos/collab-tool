import Header from './Header.tsx'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from '../services/users.tsx'
import groupService from '../services/groups.tsx'

interface UsersProps {
    id: number;
    name: string;
    isAdmin: boolean;
}

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state.groupName;
    const groupID = location.state.groupID;
    const userList = location.state.userList;

    const [groupName, setName] = useState(location.state.groupName);
    const [courseID, setCourseID] = useState(location.state.courseID);
    const [newUser, setNewUser] = useState("");

    const handleAddUser = () =>{
        console.log(groupID);
        console.log(newUser);
        userService
            .addUserGroup(Number(newUser), groupID)
            .then((res) =>{
                console.log(res);
                navigate("/");
            }).catch((error) =>{
                if(error.response){
                    console.log(error.response.data);
                }
            })
            
    }

    const handleRemoveUser = (userID:number) => {
        console.log(userID);
        groupService.removeUserGroup(groupID, userID).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    const handleUpdate = () => {
        groupService.updateGroup(groupID, groupName, courseID).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return(
        <> 
            <Header/>
            <div style={{padding: "0 50px"}}>
            <h1>            
                Admin View for {name}
            </h1>
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2>User Management</h2>
                    <label>Add User to group</label>
                    <input 
                        type='number'
                        onChange={(e) => {setNewUser(e.target.value)}}
                        value={newUser}
                        placeholder='Enter user ID'></input>
                    <button 
                        onClick={handleAddUser}
                        disabled={newUser ? false : true}
                        style={{marginTop: '10px', marginBottom: '10px'}}>Add</button>

                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {userList.map((user: UsersProps) => {
                            if(!user.isAdmin){
                                return(
                                    <li style={{textAlign: "left", margin: "10px 0"}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center'}}>
                                            <span style={{fontSize: '1.8em'}}>{user.name} ({user.id})</span>
                                            <button
                                                onClick={() => handleRemoveUser(user.id)}
                                                >Remove</button>
                                        </div> 
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                
                <div>
                    <h2>Edit Details</h2>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        
                        <label>Group Name</label>
                        <input 
                            onChange={(e) => {setName(e.target.value)}}
                            value={groupName}></input>
                        <label>Course ID</label>
                        <input 
                            type='number'
                            onChange={(e) => {setCourseID(e.target.value)}}
                            value={courseID}></input>
                        <button 
                            onClick={handleUpdate}
                            style={{marginTop: '10px'}}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Admin