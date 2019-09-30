// implement your API here
const express = require('express');
const userData = require('./data/db')


const server = express();

server.use(express.json());


/////// do CRUD requests here

server.get('/', (req, res) => {
    res.json('hello testing testing')
})

server.get('/testing', (req, res) => {
    res.json('testing again')
})

server.get('/api/users', (req, res) => {
    userData
    .find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
})


////// after CRUD requests

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`))
