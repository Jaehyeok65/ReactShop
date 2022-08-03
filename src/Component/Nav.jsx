import React, { useState } from 'react';
import styles from './Nav.module.css';
import Category from '../Component/Category';
import MobileCategory from './MobileCategory';
import { Link } from 'react-router-dom';
import { FaList } from "react-icons/fa";
import { RiHeading } from "react-icons/ri";



const Nav = () => {
    const [toggle, setToggle] = useState(false)

    const onToggle = () => {
        setToggle((prev) => !prev);
    }






    return (
        <>
        <div className={styles.nav}>
            <div className={styles.list1}>
                <button className={styles.logo} onClick={onToggle}><FaList size='24px' /></button>
                <div className={styles.item}><Link to ='/'><RiHeading color='black' size='24px' /></Link></div>
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