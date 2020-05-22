import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../Styles/profile.module.css';
import AuthHeader from './authHeader';
import * as Constants from '../constants';
import StoryItem from './storyItem';
import moment from 'moment';
import { Modal } from 'react-bootstrap';


const Profile = ({ setAuth, match: { params: { id } } }) => {

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(true);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [createdDate, setCreatedDate] = useState();
    const [storyCount, setStoryCount] = useState(0);
    const [storyList, setStoryList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");
    const [showFollowButton, setShowFollowButton] = useState(false);
    const [doesFollow, setDoesFollow] = useState();
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [selectedModalData, setSelectedModalData] = useState([]);
    const [showStory, setShowStory] = useState(false);
    const [selectedStoryBody, setSelectedStoryBody] = useState("");
    const [selectedStoryTitle, setSelectedStoryTitle] = useState("");

    useEffect(() => {
        getInfo();
        setShowFollowButton(id !== loggedUser ? true : false);
    }, [id, loggedUser]);

    const getInfo = async () => {
        try {
            const url = Constants.backendURL + '/u/' + id;
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            if (res.status === 404) {
                setValid(false);
                return;
            }

            const parseRes = await res.json();
            setDoesFollow(parseRes.doesFollow);
            setFirst(parseRes.first_name);
            setLast(parseRes.last_name);
            setCreatedDate(parseRes.created_date);
            setStoryCount(parseRes.story_count);
            setStoryList(parseRes.story_list);
            setFollowerList(parseRes.followers);
            setFollowingList(parseRes.following);
            setLoggedUser(parseRes.logged_user_id);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }

    const handleClick = (story) => {
        setSelectedStoryBody(story.body);
        setSelectedStoryTitle(story.title);
        setShowStory(true);
    }

    const handleLike = async (story) => {
        try {
            const url = Constants.backendURL + '/story/toggleLike';
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    story_id: story.story_id,
                    user_id: id
                })
            });
            const parseRes = await res.json();

            let newStoryList = storyList;
            for (var i = 0; i < storyList.length; i++) {
                if (storyList[i].story_id === story.story_id) {
                    if (parseRes === 'liked') {
                        storyList[i].likes = storyList[i].likes + 1;
                    }
                    else {
                        storyList[i].likes = storyList[i].likes - 1;
                    }
                    break;
                }
            }

            setStoryList([...newStoryList]);

        } catch (error) {
            console.error(error.message);
        }
    }

    const renderStoryList = () => {
        if (!loading && typeof storyList.map !== 'undefined') {
            return (
                storyList.map((story, index) => (
                    <StoryItem hasAuthorLink={false} key={index} story={story} handleClick={() => handleClick(story)} handleLike={() => handleLike(story)} isFeatured={false}></StoryItem>
                ))
            );
        }
    }

    const togglefollow = async () => {
        const url = Constants.backendURL + '/u/toggleFollow';

        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                logged_id: loggedUser,
                friend_id: id
            })
        });

        const parseRes = await res.json();
        if (parseRes === 'Follow') {
            setDoesFollow(true);
        }
        else {
            setDoesFollow(false);
        }
    }

    const handleOnOpen = (e) => {
        setModalText(e);

        if (e === 'Followers') {
            setSelectedModalData(followerList);
        }
        else {
            setSelectedModalData(followingList);
        }

        setOpen(true);
    }

    const handleOnHide = () => {
        setOpen(false);
    }

    const renderAuthors = () => {
        if (selectedModalData.length === 0) return;
        console.log(selectedModalData);
        return (
            selectedModalData.map((author, index) => (
                <div className={styles.authorListItem} key={index}><a href={'/u/' + author.friend_id}>{author.first_name} {author.last_name}</a></div>
            ))
        );
    }

    if (valid === false) {
        return (<Redirect to={{ pathname: '/404' }} />);
    }
    else if (loading) {
        return (<div></div>);
    }
    else {
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}><AuthHeader setAuth={setAuth} Page={Profile} userID={loggedUser} isProfile={!showFollowButton}></AuthHeader></div>
                <div className={styles.storyContainer}>
                    <h5 style={{ marginTop: 10, textAlign: "center" }}>Check out {id === loggedUser ? 'your' : first} stories</h5>
                    {renderStoryList()}
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileInfo}>
                            <h1 style={{ fontWeight: 40, color: "#444444", margin: 10 }}>{first} {last}</h1>
                            <p style={{ color: "#A9A9A9", marginLeft: 30 }}>Joined {timeSince(createdDate)} <br></br>Stories: {storyCount}</p>
                        </div>
                        <div className={styles.profileButtons}>
                            <button onClick={() => handleOnOpen('Followers')} className={styles.infoButton}>Followers</button>
                            <button onClick={() => handleOnOpen('Following')} className={styles.infoButton}>Following</button>
                            {<button style={showFollowButton ? {} : { display: "none" }} className={doesFollow ? styles.unFollowButton : styles.followButton} onClick={togglefollow}>{doesFollow ? "following" : "follow"}</button>}
                        </div>

                        <Modal
                            size="sm"
                            animation={false}
                            show={open}
                            onHide={handleOnHide}
                            centered
                        >
                            <Modal.Header>
                                <Modal.Title>{modalText}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={styles.modalContainer}>
                                    {renderAuthors()}
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                    {!showStory ? '' : (<div className={styles.selectedStoryContainer}>
                        <div className={styles.selectedStoryHeader}>
                            <h5>{selectedStoryTitle}</h5>
                            <div className={styles.subHeader}>
                                <span style={{ color: '#444444', fontSize: '13px' }}><i>By: {first} {last}</i></span>
                            </div>
                        </div>
                        <hr></hr>
                        <div className={styles.selectedStoryBody}>
                            {selectedStoryBody}
                        </div>
                    </div>)}

                </div>
            </div>
        );
    }
}

export default Profile;