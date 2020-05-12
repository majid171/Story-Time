import React from 'react';
import styles from '../Styles/authHeader.module.css';
import * as Constants from '../constants';
import { Link } from 'react-router-dom';
import Dashboard from './dashboard';
import Authors from './authors';

const AuthHeader = ({ setAuth, Page }) => {

    const buttonStyle = {
        color: '#444444'
    }

    const logout = async (e) => {
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
                <button className={styles.homeButton}><Link style={buttonStyle} to='/'>{Page===Dashboard? <strong>Home</strong>: 'Home'}</Link></button>
                <button className={styles.authorButton}><Link style={buttonStyle} to='/authors'>{Page===Authors? <strong>Authors</strong>: 'Authors'}</Link></button>
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