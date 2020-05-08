import React from 'react';
import styles from '../Styles/storyItem.module.css';

const StoryItem = ({ story, index }) => {
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
                        Posted {story.publish_date}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryItem;