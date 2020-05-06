import React, { Fragment, useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");

    async function getInfo() {
        try {
            const response = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                credentials: 'include'
            })

            const parseRes = await response.json();
            console.log(parseRes);

            setFirstName(parseRes.first_name);
            setLastName(parseRes.last_name);
            setEmail(parseRes.user_email);
            setUserID(parseRes.user_id);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = async(e) =>{
        e.preventDefault();

        await fetch('http://localhost:5000/auth/logout', {
            method: "GET",
            credentials: 'include'
        }).then(setAuth(false));
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <p>{firstName}</p>
            <button className='btn btn-primary' onClick={(e) => logout(e)}>Logout</button>
        </Fragment>
    );
}

export default Dashboard;