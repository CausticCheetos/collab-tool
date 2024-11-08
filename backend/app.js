const express = require('express');
const {Client} = require('pg');
const cors = require('cors');
/* const groups = require("./routes/groups.js") */

const client = new Client({
    user: "postgres",
    port: 5432,
    password: "password",
    database: "capstone",
    host: "localhost"
});

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

client.connect();


app.get('/api/user/:id', (request, response) => {
	client.query('Select * from public."user" where id = ' + request.params.id, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows);
        } else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/user/:id/groups', (request, response) => {
    client.query('Select * from public.user_group where id = ' + request.params.id, (err, res)=>{
        if(!err){
            var groupIDs = res.rows.map(group => group['group_id']);
            client.query('Select * from public.groups where group_id in (' + groupIDs.toString() + ')', async (err, res) =>{
                if(!err){
                    /* var result = res.rows.map((element) => {
                        client.query('Select * from public.user_group where group_id = ' + element['group_id'], (err, res)=>{
                            if(!err){
                                var usersList = res.rows;
                                element['users'] = usersList;
                                console.log(element);
                            }
                        })
 
                    }) */
                    /* let new_rows = await Promise.all(res.rows.map(async element => {
                        let newData = element;
                        client.query('Select * from public.user_group where group_id = ' + element['group_id'], (err, res)=>{
                            if(!err){
                                var usersList = res.rows;
                                newData['users'] = usersList;
                                console.log(newData);
                                return newData;
                            }
                        })
                    })) */

                    //console.log(new_rows);
                    response.json(res.rows);
                }else{
                    console.log(err.message);
                }
            })
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/groups/userlist/:id', (request, response) => {
    client.query('Select * from public.user_group where group_id = ' + request.params.id, (err, res)=>{
        if(!err){
            var usersList = res.rows;
            let result = usersList.map(({group_id, ...element})=>element)
            console.log(result);

            response.json(result);
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/groups/userlist/:id/details', (request, response) => {
    client.query('Select * from public.user_group where group_id = ' + request.params.id, (err, res)=>{
        if(!err){
            var usersList = res.rows;
            console.log(usersList);
            let userGroup = usersList.map((element)=>{
                console.log(element.isAdmin);
                return (
                    {
                        "id": element.id,
                        "isAdmin": element.isAdmin
                    }
                )
            }) 
            console.log(userGroup);

            let idList = userGroup.map((element)=> {
                return element.id
            })

            client.query('Select * from public.user where id in (' + idList.toString() + ')', (err, res)=>{
                console.log(res.rows);
                const result = res.rows.map(user => {
                    let userDetails = userGroup.find(item => item.id == user.id);
                    userDetails["name"] = user.name;
                    return userDetails;
                });
                
                response.json(result);
            })
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/groups/:id', (request, response) => {
    client.query('Select * from public.user_group where id = ' + request.params.id, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows);
        } else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/groups/details/:id', (request, response) => {
    client.query('Select * from public.groups where group_id = ' + request.params.id, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows);
        } else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/groups/tasks/:groupID', (request, response) =>{
    client.query('Select * from public.tasks where group_id = ' + request.params.groupID, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows);
        } else{
            console.log(err.message);
        }
        client.end;
    })
})

app.post('/api/groups/create', (request, response) =>{
    let groupName = request.body['groupName'];
    let courseID = request.body['courseID'];
    let userID = request.body['userID'];
    let query = `INSERT INTO public.groups(group_name, "courseID") VALUES ('` + groupName + `','` + courseID + `') RETURNING group_id`;
    console.log(query);
    if(groupName && courseID){
        client.query(query, (err, res) =>{
            if(!err){
                console.log(res.rows[0].group_id);
                const groupID = res.rows[0].group_id;
                let query = `INSERT INTO public.user_group(id, group_id, "isAdmin") VALUES (` + userID + `,` + groupID + `, true)`;
                client.query(query, (err, res) =>{
                    if(!err){
                        response.json(res.rows);
                    }else{
                        console.log(err.message);
                    }
                })
            }else{
                console.log(err.message);
            }
            client.end;
        })
    }else{
        console.log("error!");
    }
})

app.post('/api/groups/tasks/create', (request, response) =>{
    const userID = request.body['userID'];
    const groupID = request.body['groupID'];
    const taskName = request.body['taskName'];
    const description = request.body['description'];
    const query = `INSERT INTO public.tasks(user_id, group_id, task_name, description, date) values (`+ userID +`,` + groupID + `,'` + taskName + `','` + description +`', current_timestamp)`;
    console.log(query);
    if(userID && groupID && taskName && description){
        client.query(query, (err, res) =>{
            if(!err){
                console.log(res.rows);
                response.json(res);
            }else{
                console.log(err.message);
            }
            client.end;
        })
    }else{
        response.json("Error!");
    }
})

app.post('/api/groups/tasks/comments/add', (request, response) => {
    const userID = request.body['userID'];
    const taskID = request.body['taskID'];
    const comment = request.body['comment']
    const rating = request.body['rating'];
    let approval = true

    if(rating){
        if(rating < 1){
            approval = false
        }
    }else{
        approval = null;
    }

    const query = `INSERT INTO public.comments(task_id, user_id, comment, rating, approval, date) values (`+ taskID +`,` + userID + `,'` + comment + `',` + rating +`,` + approval + `,current_timestamp)`;
    console.log(query);
    if(userID && taskID && comment){
        client.query(query, (err, res) =>{
            if(!err){
                console.log(res.rows);
                response.json(res);
            }else{
                console.log(err.message);
            }
            client.end;
        })
    }else{
        response.json("Error!");
    }
})

app.get('/api/groups/tasks/comments/:taskID', (request, response) => {
    client.query('Select * from public.comments where task_id = ' + request.params.taskID, (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows)
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/comments', (request, response) =>{
    console.log(request.query.tasks);
    client.query('Select * from public.comments where task_id in (' + request.query.tasks + ')', (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows)
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.get('/api/statusList', (request, response) =>{
    client.query('Select * from public.status', (err, res)=>{
        if(!err){
            console.log(res.rows);
            response.json(res.rows)
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.patch('/api/groups/tasks/:taskID/status', (request, response)=>{
    const status = request.query.status;
    client.query('Update public.tasks set status =' + status + ' where task_id = ' + request.params.taskID, (err, res)=>{
        if(!err){
            console.log(request.query.status);
            console.log(request.params.taskID);
            
            response.json(res.rows)
        }else{
            console.log(err.message);
        }
        client.end;
    })
})

app.post('/api/user/:id/join/:groupID', (request, response) => {
    const userID = request.params.id
    const groupID = request.params.groupID
    client.query('Insert into public.user_group (id, group_id) values (' + userID + ', ' + groupID + ')', (err, res)=>{
        if(!err){
            response.json(res.rows)
        }else{
            console.log(err.message);
            response.status(422).json({message: err.message});
        }
        client.end;
    })
})

app.delete('/api/groups/:groupID/user/:id', (request, response) => {
    const userID = request.params.id
    const groupID = request.params.groupID
    client.query('Delete from public.user_group where id = ' + userID + ' and group_id = ' + groupID, (err, res)=>{
        if(!err){
            response.json(res.rows)
        }else{
            console.log(err.message);
            response.status(422).json({message: err.message});
        }
        client.end;
    })
})

app.patch('/api/groups/:groupID/update', (request, response) => {
    const groupID = request.params.groupID;
    const groupName = request.body['groupName'];
    const courseID = request.body['courseID'];

    console.log(groupID + " " + groupName + " " + courseID);
    client.query(`Update public.groups set group_name='` + groupName + `', "courseID"=` + courseID + ` where group_id=` + groupID, (err, res) =>{
        if(!err){
            response.json(res.rows)
        }else{
            console.log(err.message);
            response.status(422).json({message: err.message});
        }
        client.end;
    })
    
})

