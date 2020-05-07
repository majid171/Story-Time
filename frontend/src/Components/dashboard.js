import React, { Fragment, useState, useEffect } from 'react';
import AuthHeader from './authHeader';
import styles from '../Styles/dashboard.module.css';

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

            setFirstName(parseRes.first_name);
            setLastName(parseRes.last_name);
            setEmail(parseRes.user_email);
            setUserID(parseRes.user_id);

        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = async (e) => {
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
        <div className={styles.container}>
            <div><AuthHeader logoutHandler={logout} screen={Dashboard}></AuthHeader></div>
            <div className={styles.bodyContainer}>
                <div className={styles.storyFeedContainer}>
                    <h5>The story Feed</h5>
                </div>
                <div className={styles.storyContainer}>
                    <h5>The story</h5>
                </div>
                <div className={styles.featuredContainer}>
                    <h5>The Featured Story</h5>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;