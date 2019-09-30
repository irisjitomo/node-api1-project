// implement your API here
const express = require('express');
const cors = require('cors')
const userData = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors())

/////// do CRUD requests here

server.get('/', (req, res) => {
	res.json('hello testing testing');
});

server.get('/testing', (req, res) => {
	res.json('testing again');
});

// GET REQUEST for users
server.get('/api/users', (req, res) => {
	userData
		.find()
		.then((user) => {
			res.send(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});

// GET REQUEST for certain user :id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
        userData
        .findById(id)
        .then(user => {
            if (user) {

                res.json(user)
                
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved."})
        })
            } else  {
                res.status(404).json({ message: "The user with the specified ID does not exist."})
            }
        })
});

// POST REQUEST for adding user
server.post('/api/users', (req, res) => {
	const newUser = req.body;

	if (!newUser.name || !newUser.bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		userData
			.insert(newUser)
			.then((user) => {
				res.status(201);
				res.json(user);
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the user to the database' });
			});
	}
});

// DELETE REQUEST for deleting a specific id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
	userData
		.remove(id)
		.then(user => {
            if (user) {
                res.json(user)
            
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({error: "The user could not be removed"})
        })
});

// PUT REQUEST for updating a specific id
server.put('/api/users/:id', (req, res) => {
	const id = req.params.id;
    const updatedUser = req.body;
    
    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        userData
        .update(id, updatedUser)
        .then((user) => {
            if (user) {
                res.json(user)
                res.status(200)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
         .catch(() => {
                res.status(500).json({ error: "The user information could not be modified." })
            })
    }
});

////// after CRUD requests

const port = 8000;
server.listen(port, () => console.log(`listening on port ${port}`));
