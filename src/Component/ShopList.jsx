import React from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';
import { useState, useRef } from 'react';
import  Pagination  from './Pagegination';
import { useEffect } from 'react';





const ShopList = ( { Goods }) => {

  const scrollref = useRef();
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect( () => {
    scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  },[page])
  





    return (
      <div ref={scrollref}>
        <div className={styles.shop}>
          { Goods.slice(offset,offset + limit).map( (Good, index) => (
            <ListCard key = {index} url = {Good.url} price = {Good.price} name = {Good.name} />
          ))}
        </div>
        <div className={styles.pagenation}>
        <Pagination total={Goods.length} limit={limit} page={page} setPage={setPage} />
        </div>
        </div>
    )
}


export default ShopList;