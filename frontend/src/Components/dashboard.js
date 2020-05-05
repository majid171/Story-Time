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
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json();

            setFirstName(parseRes.first_name);
            setLastName(parseRes.last_name);
            setEmail(parseRes.user_email);
            setUserID(parseRes.user_id);

        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
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