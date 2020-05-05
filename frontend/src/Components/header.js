import React from 'react';
import styles from '../Styles/header.module.css';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

export default function header() {

    return (
        <div className={styles.container}>
            <div className={styles.titleArea}>
                <img src={require('../assets/full-logo.png')} className={styles.logo} />
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.signUpButtonContainer}>
                    <button className={styles.signUpButton}>Sign Up</button>
                </div>
                <div className={styles.logInButtonContainer}>
                    <button className={styles.logInButton}>Log In</button>
                </div>

            </div>
        </div>
    );

}