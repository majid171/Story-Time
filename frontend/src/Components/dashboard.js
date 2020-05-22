import React, { useState, useEffect } from 'react';
import AuthHeader from './authHeader';
import StoryItem from './storyItem';
import styles from '../Styles/dashboard.module.css';
import * as Constants from '../constants';
import { Modal } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

const Dashboard = ({ setAuth }) => {

    const [firstName, setFirstName] = useState("");
    const [userID, setUserID] = useState("");
    const [storyList, setStoryList] = useState([]);
    const [open, setOpen] = useState(false);
    const [createdStoryTitle, setCreatedStoryTitle] = useState('');
    const [createdStoryBody, setCreatedStoryBody] = useState('');
    const [selectedStoryTitle, setSelectedStoryTitle] = useState('');
    const [selectedStoryBody, setSelectedStoryBody] = useState('');
    const [selectedStoryAuthorFirst, setSelectedStoryAuthorFirst] = useState('');
    const [selectedStoryAuthorLast, setSelectedStoryAuthorLast] = useState('');
    const [showStoryDiv, setShowStoryDiv] = useState(false);
    const [featuredStory, setFeaturedStory] = useState([]);

    // Get the user info
    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        getFeaturedStory();
    }, []);

    // Get the story list
    useEffect(() => {
        if (userID === '') return;
        getStoryList();

    }, [userID]);

    const getStoryList = async () => {
        try {

            const url = Constants.backendURL + '/story/getStoryList';

            await fetch(url, {
                method: 'GET',
                credentials: 'include',

            })
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    if (data) setStoryList(data);
                });

            console.log(storyList);
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
            });

            const parseRes = await response.json();
            setFirstName(parseRes.first_name);
            setUserID(parseRes.user_id);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleStoryClick = (story) => {
        setShowStoryDiv(true);
        setSelectedStoryTitle(story.title);
        setSelectedStoryBody(story.body);
        setSelectedStoryAuthorFirst(story.first_name);
        setSelectedStoryAuthorLast(story.last_name);
    }

    const renderStoryListItems = () => {
        if (typeof storyList.map !== 'undefined') {
            return (
                storyList.map((story, index) => (
                    <StoryItem hasAuthorLink={true} key={index} story={story} handleClick={() => handleStoryClick(story)} handleLike={() => likeStory(story, false)} isFeatured={false}></StoryItem>
                ))
            );
        }
    }

    const renderFeaturedStory = () => {
        if (!featuredStory[0]) return;
        const story = featuredStory[0];
        return (<StoryItem story={story} handleClick={() => handleStoryClick(story)} handleLike={() => likeStory(story, true)} isFeatured={true}></StoryItem>);
    }

    const getFeaturedStory = async () => {
        try {
            const url = Constants.backendURL + '/story/getFeaturedStory';
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            const parseRes = await res.json();
            setFeaturedStory(parseRes)

        } catch (error) {
            console.error(error.message);
        }
    }

    const handlePostStory = async () => {

        setOpen(false);
        setCreatedStoryBody(createdStoryBody.trim());
        try {
            const url = Constants.backendURL + '/story/createStory';
            await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userID,
                    createdStoryTitle,
                    createdStoryBody
                })
            })
                .then(setCreatedStoryBody(''))
                .then(setCreatedStoryTitle(''))
                ;
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleOnHide = () => {
        setOpen(false);
        setCreatedStoryBody('');
        setCreatedStoryTitle('');
    }

    const canPublish = () => {
        return createdStoryTitle !== ''
            && createdStoryBody !== '';
    }

    const renderMessage = () => {
        return (
            <div style={{ marginTop: 50 }}>
                <h5>Choose a story to read</h5>
            </div>
        );
    }

    const likeStory = async (story, isFeatured) => {
        try {
            const url = Constants.backendURL + '/story/toggleLike';
            const story_id = story.story_id;
            const user_id = userID;

            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    story_id,
                    user_id
                })
            });

            const parseRes = await res.json();

            if (!isFeatured) {
                let newStoryList = storyList;

                for (var i = 0; i < newStoryList.length; i++) {
                    if (newStoryList[i].story_id === story.story_id) {
                        if (parseRes === 'liked') {
                            newStoryList[i].likes = newStoryList[i].likes + 1;
                        }
                        else {
                            newStoryList[i].likes = newStoryList[i].likes - 1;
                        }
                        break;
                    }
                }

                setStoryList([...newStoryList]);
            }
            else {
                let featured = featuredStory;
                console.log(featured);
                if (parseRes === 'liked') {
                    featured[0].likes = featured[0].likes + 1;
                }
                else {
                    featured[0].likes = featured[0].likes - 1;
                }

                setFeaturedStory([...featured]);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <div><AuthHeader setAuth={setAuth} Page={Dashboard} userID={userID}></AuthHeader></div>
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
                            onHide={handleOnHide}
                            centered

                        >
                            <Modal.Header>
                                <Modal.Title>Create Story</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modalBody}>
                                <TextField id="standard-basic" label="Title" value={createdStoryTitle} onChange={(e) => setCreatedStoryTitle(e.target.value)} style={{ width: '30%' }
                                } />
                                <textarea
                                    className={styles.bodyField}
                                    value={createdStoryBody}
                                    onChange={(e) => setCreatedStoryBody(e.target.value)}
                                />

                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={handlePostStory} disabled={!canPublish()} className={styles.publish}>Publish</button>
                            </Modal.Footer>
                        </Modal>
                        <hr></hr>
                        <h6 className={styles.leftRightTitle}>Your follower's are excited to read your stories</h6>
                    </div>
                    {!showStoryDiv ? renderMessage() :
                        <div className={styles.storyContainer}>
                            <div className={styles.storyHeaders}>
                                <h5>{selectedStoryTitle}</h5>
                                <div className={styles.subHeader}>
                                    <span style={{ color: '#444444', fontSize: '13px' }}><i>By: {selectedStoryAuthorFirst} {selectedStoryAuthorLast}</i></span>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={styles.storyBodyContainer}>
                                {selectedStoryBody}
                            </div>
                        </div>}
                </div>
                <div className={styles.featuredContainer}>
                    <h6 className={styles.leftRightTitle}>Check out the featured story of the month</h6>
                    {renderFeaturedStory()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;