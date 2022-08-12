import React from 'react';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import ShopList from '../Component/ShopList';
import { Transition } from 'react-transition-group';
import { useState } from 'react';
import { useEffect } from 'react';

const duration = 1000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 , transform : 'translate3d(0, 4%, 0)'},
  entered:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exiting:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exited:  { opacity: 0 },
};



const Shop = ( { Goods, user }) => {

    const [toggle, setToggle] = useState(false);

    useEffect( () => {
        setToggle(prev => !prev);
    },[])

    
    return (
                <div className={styles.body}>
                    <Nav user={user}/>
                    <div className={styles.sort}>
                    <Category />
                    <Transition in={toggle} timeout={500} appear>
                        { (state) => (
                    <div style={ {...defaultStyle, ...transitionStyles[state]}}>
                    <ShopList Goods = {Goods} />
                    </div>
                    )}
                    </Transition>
                    </div>
                    <Footer />
                </div>
    )
}

export default Shop;