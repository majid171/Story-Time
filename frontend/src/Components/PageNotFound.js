import React from 'react';
import styles from '../Styles/PageNotFound.module.css';

const PageNotFound = () =>{
    return(
        <div className={styles.container}>
            <div><h3>StoryTime</h3></div>
            <div><h5>404 Error. Page not found...</h5></div>
        </div>
    );
}

export default PageNotFound;