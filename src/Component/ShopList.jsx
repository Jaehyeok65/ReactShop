import React from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';





const ShopList = ( { Goods }) => {




    return (
        <div className={styles.shop}>
          { Goods.map( Good => (
            <ListCard key = {Good.id} url = {Good.url} price = {Good.price} name = {Good.name} id = {Good.id} />
          ))}
        </div>
    )
}


export default ShopList;