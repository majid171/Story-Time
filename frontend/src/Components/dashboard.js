import React, { Fragment, useState, useEffect } from 'react';
import AuthHeader from './authHeader';
import styles from '../Styles/dashboard.module.css';

const Dashboard = ({ setAuth }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [story, setStory] = useState({
        title: '',
        author: '',
        body: '',
        likes: '',
        publishDate: ''
    });

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        setStory({
            title: 'The Good Doctor',
            author: 'Majid Joseph',
            body: 'dgsdfsdfsdfsdfsdf',
            likes: '1000',
            publishDate: 'May 7th, 2020'
        });
    }, []);

    useEffect(() => {

    }, [story]);

    getSelectedStory = async() =>{
        
        const body = {};

        try {
            const res = await fetch('http://localhost:5000/dashboard/getStory', {
                method: 'GET',    
                credentials: 'include',
                body: body
            });
        }catch (err) {
            console.error(err.message);
        }
    }

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

    return (
        <div className={styles.container}>
            <div><AuthHeader logoutHandler={logout} screen={Dashboard}></AuthHeader></div>
            <div className={styles.bodyContainer}>
                <div className={styles.storyFeedContainer}>
                    <h5>The story Feed</h5>
                </div>
                <div className={styles.storyContainer}>
                    <h5>The title is {story.title}</h5>
                </div>
                <div className={styles.featuredContainer}>
                    <h5>The Featured Story</h5>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;