import React from 'react';
import styles from './Category.module.css';


const Category = () => {

    return (
        <>
        <div className={styles.category}>
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

export default Category;