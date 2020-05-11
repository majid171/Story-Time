import React from 'react';
import styles from '../Styles/storyItem.module.css';
import moment from 'moment';
import * as Constants from '../constants';
import { shadows } from '@material-ui/system';


const StoryItem = ({ story, handleClick }) => {

    const timeSince = (date) => {
        return (moment(date).fromNow());
    }


    return (
        <div className={styles.storyItem} >
            <span className={styles.title}>
                <button className={styles.titleButton} onClick={handleClick}>{story.title}</button>
            </span>
            <i><p className={styles.author}>By: {story.first_name} {story.last_name}</p></i>
            <div className={styles.bottomArea}>
                <div className={styles.likeArea}>
                    <strong>+ {story.likes}</strong>
                </div>
                <div className={styles.dateArea}>
                    Posted {timeSince(story.publish_date)}
                </div>
            </div>
        </div>
    );
}

export default StoryItem;