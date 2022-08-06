import React, { useState } from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { RiHeading } from "react-icons/ri";



const Nav = () => {
    //const [toggle, setToggle] = useState(false)

    /*const onToggle = () => {
        setToggle((prev) => !prev);
    }*/






    return (
        <>
        <div className={styles.nav}>
            <div className={styles.list1}>
                <div className={styles.item}><Link to ='/'><RiHeading color='black' size='24px' /></Link></div>
            </div>
            <div className={styles.list2}>
                <div className={styles.items}><Link to='/shop' className={styles.textlink}>SHOP</Link></div>
                <div className={styles.items}><Link to='/login' className={styles.textlink}>LOGIN</Link></div>
                <div className={styles.items}><Link to='/login' className={styles.textlink}>JOIN</Link></div>
                <div className={styles.items}><Link to='/cart' className={styles.textlink}>CART</Link></div>
                <div className={styles.items}><Link to='/myshop' className={styles.textlink}>MYSHOP</Link></div>
            </div>
        </div>

        </>
    )

}

export default Nav;