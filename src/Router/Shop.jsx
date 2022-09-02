import React from 'react';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import ShopList from '../Component/ShopList';
import { useEffect, useRef } from 'react';





const Shop = ( { Goods, user, loading }) => {

    const scrollref = useRef();


    useEffect( () => {
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },[])


    
    return (
        <div>
            { loading ? <h2 style={{textAlign : 'center'}}>Loading...</h2> :
              <div className={styles.body} ref={scrollref}>
              <Nav user={user}/>
              <div className={styles.sort}>
              <Category />
              <ShopList Goods = {Goods} />
              </div>
              <Footer />
          </div>
            }
        </div>
              
    )
}

export default React.memo(Shop);