import React, { useState, useEffect } from 'react';
import styles from '../Styles/authors.module.css';
import AuthHeader from './authHeader';
import AuthorCard from './authorCard';
import * as Constants from '../constants';

const Authors = ({ setAuth }) => {

    const [authorList, setAuthorList] = useState([]);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        getInfo();
        getAuthors();
    }, []);

    const getInfo = async () => {
        try {
            const url = Constants.backendURL + '/dashboard';
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            })

            const parseRes = await response.json();
            setUserID(parseRes.user_id);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getAuthors = async () => {
        try {
            const url = Constants.backendURL + '/u/users';

            await fetch(url, {
                method: 'GET',
                credentials: 'include',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setAuthorList(data);
                });
        } catch (error) {
            console.error(error.message);
        }
    }

    const renderAuthors = () => {
        if (typeof authorList.map !== 'undefined') {
            return (
                authorList.map((author, index) => (
                    <a key={index} href={'/u/' + author.user_id}>
                        <AuthorCard author={author}></AuthorCard>
                    </a>
                ))
            );
        }
    }

    return (
        <div className={styles.container}>
            <div><AuthHeader setAuth={setAuth} Page={Authors} userID={userID} isProfile={false}></AuthHeader></div>
            <div className={styles.bodyContainer}>
                <div><h5 style={{ marginTop: 20 }}>Check out our authors</h5></div>
                <div className={styles.authorList}>
                    {renderAuthors()}
                </div>
            </div>
        </div>
    );
}

export default Authors;