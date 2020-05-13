import React from 'react';
import styles from '../Styles/authorCard.module.css';

const AuthorCard = ({ author }) => {
    
    const generateURL = () =>{
        const url = '#';
        return url;
    }
    
    return (
        <a href={generateURL()}>
            <div className={styles.container}>
                <div className={styles.nameContainer}>
                    <h5>{author.first_name} {author.last_name}</h5>
                </div>
                <div className={styles.infoContainer}>
                    {author.story_count} {author.story_count == 1 ? "Story" : "Stories"}
                </div>
            </div>
        </a>
    );
}

export default AuthorCard;