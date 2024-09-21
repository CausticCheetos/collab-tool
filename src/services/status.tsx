import axios from 'axios'

const getStatusList = () => {
    return axios.get('http://localhost:3001/api/statusList')
}

export default {
    getStatusList: getStatusList,
}