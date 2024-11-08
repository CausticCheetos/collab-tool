import Header from './Header.tsx'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from '../services/users.tsx'

interface UsersProps {
    id: number;
    name: string;
    isAdmin: boolean;
}

const Admin = () => {
    const location = useLocation();
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
            }).catch((error) =>{
                if(error.response){
                    console.log(error.response.data);
                }
            })
    }

    return(
        <> 
            <Header/>
            <div style={{padding: "0 50px"}}>
            <h1>            
                Admin View for {groupName}
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
                                            <button>Remove</button>
                                        </div> 
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2>Edit Details</h2>
                    <label>Group Name</label>
                    <input value={groupName}></input>
                    <label>Course ID</label>
                    <input value={courseID}></input>
                    <button 
                        style={{marginTop: '10px'}}>
                        Update
                    </button>
                </div>
            </div>
            </div>
        </>
    )
}

export default Admin