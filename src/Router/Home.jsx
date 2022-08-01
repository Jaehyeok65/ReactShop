import React from 'react';
import Carusel from '../Component/Carusel';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';



const Home = ({ Goods } ) => {
    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <Carusel Goods = {Goods} />
        </div>
        </>
    )
}

export default Home;