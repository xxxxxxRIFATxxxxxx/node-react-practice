import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function AddUser() {
    const [users, setUsers] = useState([]);
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = e => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = {
            name: name,
            email: email
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
                if (data.insertedId) {
                    alert("user added successfully");
                    e.target.reset();
                }

                const addedUser = data;
                const newUsers = [...users, addedUser];
                setUsers(newUsers);
            });
    };

    useEffect(() => {
        fetch("http://localhost:4000/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [users]);

    const handleDeleteUser = id => {
        const proceed = window.confirm("Are you sure you want to delete?")

        if (proceed) {
            const url = `http://localhost:4000/users/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Deleted Successfully");
                    }
                })
        };

    };

    return (
        <div className="App">
            <h2>{users.length}</h2>

            {users.map(user => <li>
                {user.email}
                <Link to={`/users/update/${user._id}`}>
                    <button>update</button>
                </Link>
                <button onClick={() => handleDeleteUser(user._id)}>x</button>
            </li>)}

            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="Name" />
                <input type="text" ref={emailRef} placeholder="Email" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddUser;