import React from 'react';
import styles from '../Styles/authHeader.module.css';

const AuthHeader = ({ logoutHandler, screen }) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleArea}>
                <img src={require('../assets/full-logo.png')} className={styles.logo} />
            </div>
            <div className={styles.leftButtonContainer}>
                <button onClick={console.log('Clicked Home')} className={styles.homeButton}>Home</button>
                <button onClick={console.log('Clicked Authors')} className={styles.authorButton}>Authors</button>
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