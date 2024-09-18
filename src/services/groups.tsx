import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/groups'

const getGroups = (id: number) => {
    return axios.get(`${baseUrl}/${id}`)
}

const getGroupUserlist = (groupID: number) =>{
    return axios.get(`${baseUrl}/userlist/${groupID}`)
}

const getGroupUserlistDetails = (groupID: number) =>{
    return axios.get(`${baseUrl}/userlist/${groupID}/details`)
}

const getGroupTask = (groupID: number) =>{
    return axios.get(`${baseUrl}/tasks/${groupID}`)
}

const getTaskComments = (taskID: number) =>{
    return axios.get(`${baseUrl}/tasks/${taskID}`)
}

const getAllComments = (tasks: string) =>{
    return axios.get(`http://localhost:3001/api/comments?tasks=${tasks}`)
}

const createGroup = (groupName: string, courseID: number, userID: number) =>{
    const body = {
        "groupName": groupName,
        "courseID": courseID,
        "userID": userID
    }

    const json = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/create`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : json
      };

    return axios.request(config);
}

const createTask = (userID: number, groupID: number, taskName: string, description: string) =>{
    const body = {
        "userID": userID,
        "groupID": groupID,
        "taskName": taskName,
        "description": description
    }
    const json = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/tasks/create`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : json
      };

    return axios.request(config);
}

const createComment = (userID: number, taskID: number, comment: string, rating: number | null) =>{
    const body = {
        "userID": userID,
        "taskID": taskID,
        "comment": comment,
        "rating": rating
    }
    const json = JSON.stringify(body);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/tasks/comments/add`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : json
      };

    return axios.request(config);
}

export default {
    getGroups: getGroups,
    getGroupUserlist: getGroupUserlist,
    getGroupTask: getGroupTask,
    getGroupUserlistDetails: getGroupUserlistDetails,
    getTaskComments: getTaskComments,
    getAllComments: getAllComments,
    createTask: createTask,
    createComment: createComment,
    createGroup: createGroup
}