import React from 'react';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import ShopList from '../Component/ShopList';



const Shop = ( { Goods }) => {
    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <ShopList Goods = {Goods} />
        </div>
        </>
    )
}

export default Shop;