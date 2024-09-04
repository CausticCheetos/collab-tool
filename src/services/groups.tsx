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

export default {
    getGroups: getGroups,
    getGroupUserlist: getGroupUserlist,
    getGroupTask: getGroupTask,
    getGroupUserlistDetails: getGroupUserlistDetails,
    getTaskComments: getTaskComments,
    getAllComments: getAllComments
}