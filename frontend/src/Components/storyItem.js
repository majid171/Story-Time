import React from 'react';
import styles from '../Styles/storyItem.module.css';
import moment from 'moment';

const StoryItem = ({ story, handleClick, handleLike, isFeatured, hasAuthorLink }) => {

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }

    return (
        <div className={isFeatured ? styles.storyItemFeatured : styles.storyItem} >
            <span className={styles.title}>
                <button className={styles.titleButton} onClick={handleClick}>{story.title}</button>
            </span>
            {hasAuthorLink? (<i><p className={styles.authorButton}><a href={'/u/' + story.user_id}>By: {story.first_name} {story.last_name}</a></p></i>): (<i><p className={styles.authorButton}>By: {story.first_name} {story.last_name}</p></i>)}
            
            <div className={styles.bottomArea}>
                <div className={styles.likeArea}>
                    <button onClick={handleLike} className={styles.likeButton}><strong>+ {story.likes}</strong></button>
                </div>
                <div className={styles.dateArea}>
                    Posted {timeSince(story.publish_date)}
                </div>
            </div>
        </div>
    );
}

export default StoryItem;