import React from 'react';
import styles from '../Styles/authHeader.module.css';
import * as Constants from '../constants';

const AuthHeader = ({ logoutHandler, screen }) => {
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
                {/* <div className={styles.profileButtonContainer}>
                    <button className={styles.profileButton}>Profile</button>
                </div> */}
                <div className={styles.logoutButtonContainer}>
                    <button className={styles.logoutButton} onClick={logoutHandler}>Sign Out</button>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;