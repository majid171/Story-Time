import React from 'react';
import styles from '../Styles/authHeader.module.css';
import * as Constants from '../constants';
import Dashboard from './dashboard';

const AuthHeader = ({ setAuth }) => {

    const logout = async(e) =>{
        e.preventDefault();

        const url = Constants.backendURL + '/auth/logout'
        await fetch(url, {
            method: "GET",
            credentials: 'include'
        }).then(setAuth(false));
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleArea}>
                <img alt="StoryTime" src={require('../assets/full-logo.png')} className={styles.logo} />
            </div>
            <div className={styles.leftButtonContainer}>
                <button className={styles.homeButton}>Home</button>
                <button className={styles.authorButton}>Authors</button>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.logoutButtonContainer}>
                    <button className={styles.logoutButton} onClick={logout}>Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;