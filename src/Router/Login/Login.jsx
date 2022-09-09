import React, { useEffect, useState, useRef } from "react";
import mybase from "../../mybase";
import styles from '../../Component/Login.module.css'
import Nav from '../../Component/Nav';
import Category from "../../Component/Category";
import Footer from "../../Component/Footer";
import { Transition } from 'react-transition-group';
import LoginForm from "./LoginForm";


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

function Login( { user }) {
    const authService = mybase.auth();
    authService.setPersistence('session');

    const scrollref = useRef();
    const [input, setInput] = useState({
        email : '',
        password : ''
    })
    const [toggle, setToggle] = useState(false);

    useEffect( () => {
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [])
    


  return (
    <div className={styles.body} ref={scrollref}>
        <Nav user={user} />
        <div className={styles.sort}>
        <Category />
      <div className={styles.container}>
      <Transition in={toggle} timeout={500} appear>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                     <LoginForm input={input} setInput={setInput} authService={authService} />
                     </div>)
             }
        </Transition>
      </div>
      </div>
      <Transition in={toggle} timeout={500} appear>
        { (state) => (
            <div style={{...defaultStyle,...transitionStyles[state]}}>
                 <Footer className={styles.footer} />
            </div>
        )}
      </Transition>
    </div>
  );
}

export default React.memo(Login);
