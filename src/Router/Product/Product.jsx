import React from 'react';
import styles from '../../Component/Home.module.css'
import Nav from '../../Component/Nav';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Category from '../../Component/Category';
import Footer from '../../Component/Footer';
import { Transition } from 'react-transition-group';
import Reviews from '../../Component/Reviews';
import useAsync from '../../Module/useAsync';
import { getProduct } from '../../Api/getProduct';
import ProductInfo from './ProductInfo';


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



const Product = ( { user } ) => {

    const { name }  = useParams();
    const [toggle, setToggle] = useState(false);
    const scrollref = useRef();
    const [states, refetch] = useAsync(() => getProduct(name), []);

    useEffect( () => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
       return () => document.body.removeChild(script);
    },[])


    
    return (
        <>
        { states.loading ? <div className={styles.load}><h2>Loading...</h2></div> :
         <div className={styles.body} ref={scrollref}>
         <Nav user={user} />
         <div className={styles.sort}>
         <Category />
         <Transition in={toggle} timeout={500} appear>
             { (state =>  (
                 <div style={ {...defaultStyle, ...transitionStyles[state]}}>
                 <ProductInfo states={states} user={user} />
              </div>
             ))}
        </Transition>
         </div>
         <Reviews />
         <Footer />
     </div>
        }
       
        </>
    )
}

export default React.memo(Product);