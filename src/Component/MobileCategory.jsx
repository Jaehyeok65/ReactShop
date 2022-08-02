import React from 'react';
import styles from './Category.module.css';
import { Link } from 'react-router-dom';


const MobileCategory = () => {

    return (
        <>
        <div className={styles.categorys}>
            <div className={styles.item}><Link to='/shop'>SHOP</Link></div>
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