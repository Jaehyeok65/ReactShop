import React from 'react';
import Carusel from '../Component/Carusel';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
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
            <br/>
            <Footer />
        </div>
        </>
    )
}

export default Home;