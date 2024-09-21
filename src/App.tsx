import { useEffect, useState } from 'react'
import './App.css'
import userService from './services/users.tsx'
import statusService from './services/status.tsx'
/* import groupService from './services/groups.tsx' */
import Group from  './components/Group.tsx'
import { useNavigate } from 'react-router-dom';

interface groupsProps {
  group_id: number;
  group_name: string;
  courseID: number;
  users: {
    id: number,
    isAdmin: boolean
  }[];
}

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('')
  const [personID, setPersonID] = useState<number>(0);
  const [groups, setGroups] = useState<groupsProps[]>([]);
  const [statusList, setStatusList] = useState([]);

  //Change users
  const userID:number = 1;

  /* const groups = [
    {
      'id': 1,
      'courseID': 41113,
      'name': "SDS Group 1",
      'users': [{
        'userID': 1,
        'isAdmin': false
      }]
    }
  ] */

  useEffect(() => {
    userService
      .getUser(userID)
      .then((response) => {
          setUserName(response.data[0]["name"])
          setPersonID(response.data[0]["id"])
      })
    
    statusService
      .getStatusList()
      .then((response) =>{
        console.log(response.data);
        setStatusList(response.data);
    })

    getGroups();
    
  }, [])
  
  async function getGroups(){
    let results: groupsProps[] = [];
    await userService.getUserGroupsDetails(userID)
    .then((response) =>{
      results = response.data;
      setGroups(results);
    })
  }

  
  return (
    <>
      <h1>Welcome {userName}!</h1>
      <div className="card">
        
      </div>
      <p>
        Hello {userName} your userID is {personID}
      </p>
      <button 
        onClick={() => navigate("/newGroup", {
                    state: {
                        userID: userID
                    }})
                }>
        Create a new group
      </button>
      {groups.map((group) =>{
        /* console.log(Object.keys(groups).length); */
        return(
          <Group id={personID} name={group['group_name']} groupID={group['group_id']} statusList={statusList}/>
        )
      })}
    </>
  )
}

export default App
