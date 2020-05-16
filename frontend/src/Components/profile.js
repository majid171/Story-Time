import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../Styles/profile.module.css';
import AuthHeader from './authHeader';
import * as Constants from '../constants';
import StoryItem from './storyItem';
import moment from 'moment';


const Profile = ({ setAuth, userID }) => {

    const [valid, setValid] = useState(true);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [createdDate, setCreatedDate] = useState();
    const [storyCount, setStoryCount] = useState(0);
    const [storyList, setStoryList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    useEffect(() => {
        getInfo();
    }, []);

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }

    const getInfo = async () => {
        try {
            const url = Constants.backendURL + '/u/users/' + userID;
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            if (res.status === 404) {
                setValid(false);
                return;
            }

            const parseRes = await res.json();
            console.log(parseRes);

            setFirst(parseRes.first_name);
            setLast(parseRes.last_name);
            setCreatedDate(parseRes.created_date);
            setStoryCount(parseRes.story_count);
            setStoryList(parseRes.story_list);
            setFollowerList(parseRes.followers);
            setFollowingList(parseRes.following);

        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    const handleClick = () => {

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
                    user_id: userID
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
        if (typeof storyList.map !== 'undefined') {
            return (
                storyList.map((story, index) => (
                    <StoryItem key={index} story={story} handleClick={() => handleClick(story)} handleLike={() => handleLike(story)} isFeatured={false}></StoryItem>
                ))
            );
        }
    }

    return (valid === false ? <Redirect to={{ pathname: '/404' }} /> :
        <div className={styles.container}>
            <div className={styles.headerContainer}><AuthHeader setAuth={setAuth} Page={Profile}></AuthHeader></div>
            <div className={styles.storyContainer}>
                <h5 style={{ marginTop: 10, textAlign: "center" }}>Check out your stories</h5>
                {renderStoryList()}
            </div>
            <div className={styles.middleContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        <h1 style={{ fontWeight: 40, color: "#444444", margin: 10 }}>{first} {last}</h1>
                        <p style={{ color: "#A9A9A9", marginLeft: 30 }}>Joined {timeSince(createdDate)} <br></br>Stories: {storyCount}</p>
                    </div>
                    <div className={styles.profileButtons}>
                        <button className={styles.infoButton}>Followers</button>
                        <button className={styles.infoButton}>Following</button>
                        <button className={styles.unFollowButton}>Unfollow</button>
                    </div>
                </div>
                <div className={styles.storyBodyContainer}>

                </div>
            </div>
        </div>
    );
}

export default Profile;