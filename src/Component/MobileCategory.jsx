import React from 'react';
import styles from './Category.module.css';


const MobileCategory = () => {

    return (
        <>
        <div className={styles.categorys}>
            <div className={styles.item}>SHOP</div>
            <div className={styles.item}>ABOUT AS</div>
            <div className={styles.item}>COLLECTION</div>
            <div className={styles.item}>STOCKIST</div>
            <div className={styles.item}>CONTACT</div>
            <div className={styles.item}>COMMUNITY</div>
        </div>
        </>
    )
}

export default MobileCategory;