import React from 'react';
import styles from '../Styles/header.module.css';
import * as Constants from '../constants';

const Header = () => {

    return (
        <div className={styles.container}>
            <div className={styles.titleArea}>
                <img src={require('../assets/full-logo.png')} className={styles.logo} />
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.signUpButtonContainer}>
                    <a href="/register" className={styles.signUpButton}>Sign Up</a>
                </div>
                <div className={styles.logInButtonContainer}>
                    <a href="/login" className={styles.logInButtonContainer}>Log In</a>
                </div>

            </div>
        </div>
    );

}

export default Header;
