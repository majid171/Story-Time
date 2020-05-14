import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../Styles/profile.module.css';
import AuthHeader from './authHeader';
import * as Constants from '../constants';

const Profile = ({ setAuth, match: { params: { id } } }) => {

    const [valid, setValid] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [totalLikes, setTotalLikes] = useState(0);
    const [storyCount, setStoryCount] = useState(0);
    const [storyList, setStoryList] = useState([]);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const url = Constants.backendURL + '/users/' + id;
            const res = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            res.status !== 404? setValid(true): setValid(false);

            const parseRes = await res.json();
            setFirst(parseRes.first_name);
            setLast(parseRes.last_name);
            setTotalLikes(parseRes.total_likes);
            setStoryCount(parseRes.story_count);

            console.log(parseRes);
            // setFirst();

        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    return (valid===false ? <Redirect to={{ pathname: '/404' }} /> :
        <div className={styles.container}>
            <div className={styles.headerContainer}><AuthHeader setAuth={setAuth} Page={Profile}></AuthHeader></div>
            <div className={styles.profileContainer}>
                <h5>{first} {last}</h5>
            </div>
            <div className={styles.feedContainer}>

            </div>

        </div>
    );
}

export default Profile;