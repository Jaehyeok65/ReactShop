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
                <div className={styles.items}><Link to='/login' className={styles.textlink}>LOGIN</Link></div>
                <div className={styles.items}>JOIN</div>
                <div className={styles.items}>MYSHOP</div>
                <div className={styles.items}><Link to='/cart' className={styles.textlink}>CART</Link></div>
                <div className={styles.items}>ORDER</div>
            </div>
        </div>

        </>
    )

}

export default Nav;