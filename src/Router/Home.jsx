import React from 'react';
import Carusel from '../Component/Carusel';
import Category from '../Component/Category';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';



const Home = ({ Goods } ) => {
    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <Carusel Goods = {Goods} />
            </div>
        </div>
        </>
    )
}

export default Home;