/* const express = require('express');
const {getClient} = require('../postgresql.js')

const router = express.Router();

router.get('/tasks/:groupID', (request, response) =>{
    getClient().query('Select * from public.tasks where group_id = ' + request.params.groupID, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows);
        } else{
            console.log(err.message);
        }
        getClient().end;
    })
})

module.exports = router */