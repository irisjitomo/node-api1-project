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

// GET REQUEST for users
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

// GET REQUEST for certain user :id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    userData
    .findById(id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})

// POST REQUEST for adding user
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: 'needs a complete data set'})
    } else {
        userData
        .insert(newUser)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
    }
})


////// after CRUD requests

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`))
