const {Client} = require('pg');

let client = null;

function createPool(){
    const client = new Client({
        user: "postgres",
        port: 5432,
        password: "password",
        database: "capstone",
        host: "localhost"
    });
    return client;
}

function getClient(){
    if(!client){
        main = createPool();
    }
    return main;
}

module.exports = {getClient};
