import React, { useEffect, useState } from "react";
import mybase from "../mybase";
import styles from '../Component/Login.module.css'
import Nav from '../Component/Nav';
import Category from "../Component/Category";
import Footer from "../Component/Footer";
import { Transition } from 'react-transition-group';


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
    const authService = mybase.auth();
    authService.setPersistence('session');

    //const [email, setEmail] = useState(null);
    //const [password, setPassword] = useState(null);
    const [input, setInput] = useState({
        email : '',
        password : ''
    })
    const [toggle, setToggle] = useState(false);

    useEffect( () => {
        setToggle(prev => !prev);
    }, [])


    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            //계정 생성
            const data = await authService.createUserWithEmailAndPassword(input.email, input.password);
            console.log(data);
        }
        catch(error) {
            console.log(error);
        }
        
        
    }
  return (
    <div className={styles.body}>
        <Nav user={user} />
        <div className={styles.sort}>
        <Category />
      <div className={styles.container}>
      <Transition in={toggle} timeout={500} appear>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                      <div className={styles.mgbt}>
                      <form onSubmit={onSubmit}>
                        <div className={styles.logincontainer}>
                         <h2>JOIN US</h2>
                         <input type='email' name='email' value={input.email} placeholder="email..." onChange={onChange}/>
                         <input type='password' name='password' value={input.password} placeholder="password..." onChange={onChange} />
                         <input type='submit' value = 'JOIN US' />
                         </div>
                         <br/>
                      </form>
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

export default Join;
