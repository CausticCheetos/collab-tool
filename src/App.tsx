import { useEffect, useState } from 'react'
import './App.css'
import userService from './services/users.tsx'
import statusService from './services/status.tsx'
/* import groupService from './services/groups.tsx' */
import Group from  './components/Group.tsx'
import Header from './components/Header.tsx'

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
          setPersonID(response.data[0]["id"])
          setUserName(response.data[0]["name"])
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
      <Header/>
      <h1>{userName}'s Groups</h1>
      {groups.map((group) =>{
        /* console.log(Object.keys(groups).length); */
        return(
          <Group 
            id={personID} 
            name={group['group_name']} 
            groupID={group['group_id']}
            courseID={group['courseID']}
            statusList={statusList}/>
        )
      })}
    </>
  )
}

export default App
