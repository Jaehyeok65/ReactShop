import React, { useState, useEffect, useRef } from 'react';
import Category from '../../Component/Category';
import Nav from '../../Component/Nav';
import styles from '../../Component/Write.module.css';
import { useParams } from 'react-router-dom';
import Footer from '../../Component/Footer';
import { Transition } from 'react-transition-group';
import useAsync from '../../Module/useAsync';
import { getProduct } from '../../Api/getProduct';
import WriteInfo from './WriteInfo';
import WriteTextbox from './WriteTextbox';
import WriteUi from './WriteUi';
import { GetUpdate } from './GetUpdate';

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


const Write = () => {

    const { update } = useParams();
    const { name } = useParams();;
    const scrollref = useRef();

    const [states, refetch] = useAsync(() => getProduct(name), []);


    const [ toggle, setToggle ] = useState(false);


    const [ input, setInput ] = useState({
        subject : '',
        content : '',
        productname : states.data.name,
        name : JSON.parse(window.sessionStorage.getItem('user')) !== null ? JSON.parse(window.sessionStorage.getItem('user')).displayName : '',
        date : '',
        toggle : false,
        createdat : new Date(),
        url : states.data.url
    });


    useEffect(() => {
        getUpdate();
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, []);
    


    const getUpdate = GetUpdate(update, setInput);

    console.log(states);


    return (
        <>
        { states.loading ? <h2 className={styles.load}>Loading...</h2> :
         <div ref={scrollref}>
         <Nav />
         <div className={styles.sort}>
             <Category />
             <div className={styles.container}>
             <Transition in={toggle} timeout={500} appear> 
             { (state => (
                 <div style={ {...defaultStyle, ...transitionStyles[state]}}>
             <div className={styles.write}>
                 <p className={styles.p1}>REVIEW</p>
                 <p className={styles.p2}>상품 사용후기입니다.</p>
                 <div className={styles.back}>
                     <WriteInfo states={states} />
                     <div className={styles.flexcontainer3}>
                     <hr/>
                     <WriteTextbox input={input} setInput={setInput} />
                     <WriteUi input={input} name={name} update={update} />
                     </div>
                 </div>
             </div>
             </div>
             ))}
             </Transition>
             </div>
         </div>
         <Footer />
     </div>
        }
        </>
    )


}



export default React.memo(Write);