import React from 'react';
import Carusel from '../Component/Carusel';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import { Transition } from 'react-transition-group';
import { useState } from 'react';
import { useEffect } from 'react';

const duration = 1000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  width : '82%',
}

const transitionStyles = {
  entering: { opacity: 0 , transform : 'translate3d(0, 4%, 0)'},
  entered:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exiting:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exited:  { opacity: 0 },
};



const Home = ({ Goods } ) => {

    const [toggle, setToggle] = useState(false);

    useEffect( () => {
        setToggle(prev => !prev);   
    }, [])
    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <Transition in={toggle} timeout={500} appear>
                { (state) => (
                <div style={ {...defaultStyle, ...transitionStyles[state]}} className={styles.mobile}>
            <Carusel Goods = {Goods} />
            </div>)}
            </Transition>
            </div>
            <br/>
            <Footer />
        </div>
        </>
    )
}

export default Home;