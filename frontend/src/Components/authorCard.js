import React from 'react';
import styles from '../Styles/authorCard.module.css';
import { Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const AuthorCard = ({ author, onClick }) => {

    const generateURL = () => {
        const url = '/u/' + author.user_id;
        console.log(url);
        return url;
    }

    return (
        // <Link to={() => generateURL()}>
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                {/* <button onClick={onClick}/><h5>{author.first_name} {author.last_name}</h5></button> */}
                {/* <button onClick={onClick}>{author.first_name} {author.last_name}</button> */}
                <h5>{author.first_name} {author.last_name}</h5>
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