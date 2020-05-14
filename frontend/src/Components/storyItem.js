import React from 'react';
import styles from '../Styles/storyItem.module.css';
import moment from 'moment';

const StoryItem = ({ story, handleClick, handleLike, isFeatured }) => {

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }

    // console.log('The item received is', story);

    return (
        <div className={isFeatured? styles.storyItemFeatured: styles.storyItem} >
            <span className={styles.title}>
                <button className={styles.titleButton} onClick={handleClick}>{story.title}</button>
            </span>
            <i><p className={styles.author}>By: {story.first_name} {story.last_name}</p></i>
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