import React from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';
import { useState, useRef, useEffect } from 'react';
import  Pagination  from './Pagegination';
import './ShopList.css';




const ShopList = ( { Goods }) => {

  const scrollref = useRef();
  const pageref = useRef();
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect( () => {
    
    pageref.current.style.animation="fadein 3s 0s";
    //pageref.current.style.opacity="1";
    scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  },[page])

  const aniend = () => {
    pageref.current.style.animation="";
  }

  

 
  





    return (
      <div ref={scrollref}>
          <div className='shop' ref={pageref} onAnimationEnd={aniend}>
          { Goods.slice(offset,offset + limit).map( (Good, index) => (
            <ListCard key = {index} url = {Good.url} price = {Good.price} name = {Good.name}  />
          ))}
        </div>
        <div className='pagenation'>
        <Pagination total={Goods.length} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>
    )
}


export default React.memo(ShopList);