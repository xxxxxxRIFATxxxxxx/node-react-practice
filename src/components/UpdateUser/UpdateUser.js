import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    return (
        <div>
            <h2>This is Update User</h2>
            {id}
            <p>{user.email}</p>
        </div>
    );
};

export default UpdateUser;