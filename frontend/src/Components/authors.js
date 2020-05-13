import React, { useState, useEffect } from 'react';
import styles from '../Styles/authors.module.css';
import AuthHeader from './authHeader';
import AuthorCard from './authorCard';
import * as Constants from '../constants';

const Authors = ({ setAuth }) => {

    const [authorList, setAuthorList] = useState([]);

    useEffect(() => {
        getAuthors();
    }, []);

    const getAuthors = async () => {
        try {
            const url = Constants.backendURL + '/u/users';

            const res = await fetch(url, {
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
                    <AuthorCard key={index} author={author}></AuthorCard>
                ))
            );
        }
    }

    return (
        <div className={styles.container}>
            <div><AuthHeader setAuth={setAuth} Page={Authors}></AuthHeader></div>
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