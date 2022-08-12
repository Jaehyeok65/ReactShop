import React, { useState } from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { RiHeading } from "react-icons/ri";
import mybase from "../mybase";




const Nav = ( { user }) => {
    const authService = mybase.auth();
    authService.setPersistence('session');

    const onLogout = () => {
        const confirm = window.confirm('로그아웃을 하시겠습니까?');
        if(confirm) {
            authService.signOut();
            window.location.href='/'; //로그아웃 후 홈으로 이동
        }
    }






    return (
        <>
        <div className={styles.nav2}>
        <div className={styles.nav}>
            <div className={styles.list1}>
                <div className={styles.item}><Link to ='/'><RiHeading color='black' size='24px' /></Link></div>
            </div>
            <div className={styles.list2}>
                <div className={styles.items}><Link to='/shop' className={styles.textlink}>SHOP</Link></div>
                <div className={styles.items}>{ user ? <button className={styles.logout} onClick={onLogout}>LOGOUT</button> : <Link to='/login' className={styles.textlink}>LOGIN</Link> }</div>
                <div className={styles.items}><Link to='/join' className={styles.textlink}>JOIN</Link></div>
                <div className={styles.items}><Link to='/cart' className={styles.textlink}>CART</Link></div>
                <div className={styles.items}><Link to='/myshop' className={styles.textlink}>MYSHOP</Link></div>
            </div>
        </div>
        </div>
        </>
    )

}

export default Nav;