import { useEffect, useState } from 'react'
import './App.css'
import userService from './services/users.tsx'
/* import groupService from './services/groups.tsx' */
import Group from  './components/Group.tsx'

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
  const [userName, setUserName] = useState<string>('')
  const [personID, setPersonID] = useState<number>(0);
  const [groups, setGroups] = useState<groupsProps[]>([]);

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
          console.log(response.data);
          setUserName(response.data[0]["name"])
          setPersonID(response.data[0]["id"])
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
      <button>
        Create a new group
      </button>
      {groups.map((group) =>{
        console.log(Object.keys(groups).length);
        return(
          <Group id={personID} name={group['group_name']} groupID={group['group_id']}/>
        )
      })}
    </>
  )
}

export default App
