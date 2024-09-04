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

export default {
    getAll: getAll,
    getUser: getUser,
    getUserGroupsDetails: getUserGroupsDetails
}