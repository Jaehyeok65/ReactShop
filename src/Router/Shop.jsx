import React from 'react';
import Category from '../Component/Category';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import ShopList from '../Component/ShopList';



const Shop = ( { Goods }) => {
    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <ShopList Goods = {Goods} />
            </div>
        </div>
        </>
    )
}

export default Shop;