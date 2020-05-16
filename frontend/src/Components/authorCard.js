import React from 'react';
import styles from '../Styles/authorCard.module.css';
import { Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const AuthorCard = ({ author }) => {

    const generateURL = () => {
        const url = '/u/' + author.user_id;
        console.log(url);
        return url;
    }

    return (
        // <Link to={() => generateURL()}>
            <div className={styles.container}>
                <div className={styles.nameContainer}>
                    <button onClick={() => <Redirect to={generateURL()}/>}><h5>{author.first_name} {author.last_name}</h5></button>
                    {/* <h5>{author.first_name} {author.last_name}</h5> */}
                </div>
                <div className={styles.infoContainer}>
                    {author.story_count} {author.story_count == 1 ? "Story" : "Stories"}
                </div>
            </div>
        // </Link>
        // <a href={generateURL()}>

        // </a>
    );
}

export default AuthorCard;