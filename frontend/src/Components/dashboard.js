import React, { useState, useEffect } from 'react';
import AuthHeader from './authHeader';
import StoryItem from './storyItem';
import styles from '../Styles/dashboard.module.css';
import * as Constants from '../constants';
import { Modal } from 'react-bootstrap';

const Dashboard = ({ setAuth }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [storyList, setStoryList] = useState([{}]);
    const [story, setStory] = useState({});
    const [open, setOpen] = useState(false);
    const [creadtedStoryTitle, setCreadtedStoryTitle] = useState('');
    const [createdStoryBody, setCreatedStoryBody] = useState('');

    // Get the user info
    useEffect(() => {
        getInfo();
    }, []);

    // Get the story list
    useEffect(() => {
        if (userID === '') return;
        getStoryList();
    }, [userID]);

    // Set the story list to the page
    useEffect(() => {
        console.log(storyList);
    }, [storyList]);

    const getStoryList = async () => {
        try {
            const params = new URLSearchParams({
                id: userID
            });
            const url = Constants.backendURL + '/story/getStoryList?' + params.toString();

            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include',

            })
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    setStoryList(data);
                });
        } catch (error) {
            console.error(error.message);
        }
    }

    const getInfo = async () => {
        try {
            const url = Constants.backendURL + '/dashboard';
            const response = await fetch(url, {
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

    const renderStoryListItems = () => {
        return (
            storyList.map((story, index) => (
                <StoryItem story={story} index={index}></StoryItem>
            ))
        );
    }

    const postStory = async () => {
        try {

            const url = Constants.backendURL + '/story/createStory';
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userID,
                    creadtedStoryTitle,
                    createdStoryBody
                })
            });

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <div><AuthHeader setAuth={setAuth}></AuthHeader></div>
            <div className={styles.bodyContainer}>
                <div className={styles.storyFeedContainer}>
                    <h6 className={styles.leftRightTitle}>Check out stories from people you follow</h6>
                    <div className={styles.storyListContainer}>
                        {renderStoryListItems()}
                    </div>
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.addContainer}>
                        <button onClick={() => setOpen(true)} className={styles.shareButton}>What's on your mind, {firstName}?</button>

                        <Modal
                            size="lg"
                            animation={false}
                            show={open}
                            onHide={() => setOpen(false)}
                            centered
                        >
                            <div>the stuff will go here</div>
                        </Modal>


                        <hr></hr>
                        <h6 className={styles.leftRightTitle}>Your follower's are excited to read your stories</h6>
                    </div>
                    <div>

                    </div>
                </div>
                <div className={styles.featuredContainer}>
                    <h6 className={styles.leftRightTitle}>Check out the featured story of the month</h6>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;