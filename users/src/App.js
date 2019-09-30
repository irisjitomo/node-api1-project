import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios'

function App() {
  const newData = {
    name : '',
    bio : ''
  }

  const [user, setUser] = useState([])
  const [newUser, setNewUser] = useState(newData)

  const data = {
    name: newUser.name,
    bio: newUser.bio
  }

  const submitForm = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/users', (data))
    .then(res => {
      console.log(res.data)
      console.log(data)
    })
    .catch(err => console.log(err))
    setNewUser(newData)
  }

  const handleChange = e => {
    e.persist()
    setNewUser({
      ...newUser,
      [e.target.name] : e.target.value
    })
  }

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
    .then(res => {
      console.log(res.data)
      setUser(res.data)
    })
  }, [])

  return (
    <div className="App">
        <h1>My Own API requests test</h1>
        <div>
          <form onSubmit={submitForm}>
            <input name="name" value={newUser.name} onChange={handleChange}/>
            <input name="bio" value={newUser.bio} onChange={handleChange}/>
            <button>Submit</button>
          </form>
          </div>
        {user.map(users => {
          return (
            <div key={users.id}>
              <h1>{users.name}</h1>
              <h2>{users.bio}</h2>
              <button>Delete</button>
            </div>
          )
        })}
    </div>
  );
}

export default App;
