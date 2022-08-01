import React, { useState } from 'react';
import styles from './Nav.module.css';
import Category from '../Component/Category';
import MobileCategory from './MobileCategory';



const Nav = () => {
    const [toggle, setToggle] = useState(true)

    const onToggle = () => {
        setToggle((prev) => !prev);
    }






    return (
        <>
        <div className={styles.nav}>
            <div className={styles.list1}>
                <button className={styles.logo} onClick={onToggle}>로고</button>
                <div className={styles.item}>LOGO</div>
            </div>
            <div className={styles.list2}>
                <div className={styles.items}>LOGIN</div>
                <div className={styles.items}>JOIN</div>
                <div className={styles.items}>MYSHOP</div>
                <div className={styles.items}>CART</div>
                <div className={styles.items}>ORDER</div>
            </div>
        </div>
        <Category />
        {toggle ? <MobileCategory /> : null } 
        </>
    )

}

export default Nav;