import React from 'react';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import styles from '../Component/Carusel2.module.css'
import Nav from '../Component/Nav';
import { Transition } from 'react-transition-group';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div className={styles.body}>
        <Nav />
        <Category />
        <div className={styles.container}>
            <div className={styles.outer}>
                <div className={styles.details}>
                    <Transition in={toggle} timeout={700}>
                        {(state) => (
                            <div style={{...defaultStyle,...transitionStyles[state]}}>
                             <h2>Best Selling Items</h2>
                             <p><Link to='/shop' className={styles.textlink}>SHOP NOW</Link></p>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;