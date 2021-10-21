import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();

  const handleAddUser = e => {
    e.preventDefault();

    const name = nameRef.current.value;
    const newUser = {
      name: name
    }

    fetch("http://localhost:4000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      });

    nameRef.current.value = "";

  };

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="App">
      <h2>{users.length}</h2>

      {users.map(user => <li>{user.name}</li>)}

      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="Name" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
