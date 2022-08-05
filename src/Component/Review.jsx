import React from 'react';
import styles from './Home.module.css';


const Review = () => {

    return (
    <>
    <div className={styles.review}>
        <p>REVIEW</p>
        <div className={styles.buttons}>
            <button>WRITE</button>
            <button>LIST</button>
        </div>
    </div>
    <table className={styles.tables}>
            <tr>
                <td>NO</td>
                <td>SUBJECT</td>
                <td>NAME</td>
                <td>DATE</td>
                <td>HIT</td>
            </tr>
        </table>
    </>
    )
}


export default Review;