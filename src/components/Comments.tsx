import { useEffect, useState } from 'react';
import userService from '../services/users.tsx'
import './Comments.css'

interface CommentProps {
    userID: number;
    contents: string;
    date: string;
}

const Comments = ({userID, contents, date} : CommentProps) => {

    const [name, setName] = useState<string>('');

    useEffect(() => {
        userService
          .getUser(userID)
          .then((response) => {
              console.log(response.data);
              setName(response.data[0]["name"])
          })
    }, [userID])

    return(
        <div>
            <div className='commentDetails'>
                <strong>
                    {name}
                </strong>
                <span>
                    posted on {date}
                </span>
            </div>
            
            <p>
                {contents}
            </p>

        </div>
    )
}

export default Comments