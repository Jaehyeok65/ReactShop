import React, { useEffect, useState, useRef } from "react";
import styles from '../../Component/Login.module.css'
import Nav from '../../Component/Nav';
import Category from "../../Component/Category";
import Footer from "../../Component/Footer";
import { Transition } from 'react-transition-group';
import Joininfo from "./Joininfo";
import JoinForm from "./JoinForm";


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

function Join( { user }) {

    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmInput = useRef();
    const firstphoneInput = useRef();
    const secondphoneInput = useRef();
    const thirdphoneInput = useRef();
    const scrollref = useRef();

    const [input, setInput] = useState({
        email : '',
        password : '',
        displayname : '',
        confirm : '',
        phone : {
          first : '010',
          second : '',
          third : ''
        }
    })
    const [toggle, setToggle] = useState(false);

    const [ joininput , setJoininput ] = useState( {
      first : false,
      second : false,
      third : false,
      four : false
    })

    useEffect( () => {
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [])

    

  return (
    <div className={styles.body} ref={scrollref}>
      <Nav user={user} />
      <div className={styles.sort}>
      <Category />
      <div>
      <Transition in={toggle} timeout={500} appear>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                      <div className={styles.flexcontainer}>
                        <Joininfo joininput={joininput} setJoininput={setJoininput} />
                      <div className={styles.mgbt}>
                        <JoinForm input={input} setInput={setInput} joininput={joininput} nameInput={nameInput} 
                        confirmInput={confirmInput} passwordInput={passwordInput} emailInput={emailInput} 
                        firstphoneInput={firstphoneInput} secondphoneInput={secondphoneInput} thirdphoneInput={thirdphoneInput} />
                      </div>
                      </div>
                    </div>)}
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

export default React.memo(Join);
