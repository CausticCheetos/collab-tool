import axios from 'axios'

const getStatusList = () => {
    return axios.get('http://localhost:3001/api/statusList')
}

const updateStatus = (statusID: number, taskID: number) =>{

    const config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/api/groups/tasks/${taskID}/status?status=${statusID}` ,
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    return axios.request(config);
}

export default {
    getStatusList: getStatusList,
    updateStatus: updateStatus
}