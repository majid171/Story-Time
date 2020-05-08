import React from 'react';
import styles from '../Styles/storyItem.module.css';
import moment from 'moment';
import * as Constants from '../constants';

const StoryItem = ({ story, index }) => {

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }

    return (
        <div>
            <div key={index} className={styles.storyItem} >
                <span className={styles.title}><strong>{story.title}</strong></span>
                <i><p className={styles.author}>By: {story.first_name} {story.last_name}</p></i>
                <div className={styles.bottomArea}>
                    <div className={styles.likeArea}>
                        <img className={styles.likeImage} src={require('../assets/like.png')} />
                        <strong>{story.likes}</strong>
                    </div>
                    <div className={styles.dateArea}>
                        Posted {timeSince(story.publish_date)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryItem;