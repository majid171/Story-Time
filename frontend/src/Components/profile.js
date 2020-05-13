import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import styles from '../Styles/profile.module.css';
import AuthHeader from './authHeader';
import * as Constants from '../constants';

const Profile = ({ setAuth, match:{params:{id}} }) =>{

    const goodID = async() =>{
        try {
            const url = Constants.backendURL + '/users/' + id;
            const res = await fetch(url,{
                method: 'GET',
                credentials: 'include'
            });

            return res.status === 200? true: false;

        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    return(!goodID()? <Redirect to={{pathname: '/404'}} />:
        <div className={styles.container}>
            <div><AuthHeader setAuth={setAuth} Page={Profile}></AuthHeader></div>
            <div className={styles.leftContainer}>
                World
            </div>
            <div className={styles.middleContainer}>
                Hello
            </div>
        </div>
    );
}

export default Profile;