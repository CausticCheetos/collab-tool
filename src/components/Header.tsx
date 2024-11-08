import './Header.css'
import { useEffect, useState } from 'react'
import userService from '../services/users.tsx'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    //Change users
    const userID:number = 1;
    const [userName, setUserName] = useState<string>('')

    useEffect(() => {
        userService
          .getUser(userID)
          .then((response) => {
              setUserName(response.data[0]["name"])
          })
        
      }, [])
    return(
        <header style={{display:'flex', justifyContent:'space-between', background: 'black', marginBottom: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: '1.8em'}}>
                    Welcome <strong>{userName}!</strong>
                </span>
                <span style={{fontSize: '0.8em'}}>
                    ID: {userID}
                </span>
            </div>
            <div className='navBar'>
                <button onClick={() => navigate("/")}>
                    Home
                </button>
                <button onClick={() => navigate("/newGroup", {
                    state: {
                        userID: userID
                    }})
                }>
                    New Group
                </button>
            </div>
        </header>
    )
}

export default Header