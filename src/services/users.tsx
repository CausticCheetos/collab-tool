import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/user'

const getAll = () => {
    return axios.get(baseUrl)
}

const getUser = (id: number) => {
    return axios.get(`${baseUrl}/${id}`)
}

const getUserGroupsDetails = (userID: number) => {
    return axios.get(`${baseUrl}/${userID}/groups`)
}

const addUserGroup = (userID: number, groupID: number) => {
    const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/${userID}/join/${groupID}`,
    headers: { 
        'Content-Type': 'application/json'
    }
    };

    return axios.request(config);
}

export default {
    getAll: getAll,
    getUser: getUser,
    getUserGroupsDetails: getUserGroupsDetails,
    addUserGroup:addUserGroup
}