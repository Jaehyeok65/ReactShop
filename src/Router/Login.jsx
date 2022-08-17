import React, { useEffect, useState, useRef } from "react";
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

function Login( { user }) {
    const authService = mybase.auth();
    authService.setPersistence('session');

    //const [email, setEmail] = useState(null);
    //const [password, setPassword] = useState(null);
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
                //로그인 성공
            const data = await authService.signInWithEmailAndPassword(input.email,input.password);
            if(data) {
              const uid = data.user.uid;
              const response = {...input, uid}
              window.sessionStorage.setItem('user',JSON.stringify(response));
              window.history.back(); //이전 페이지로 리디렉션함.
              //window.location.href='/';
            }
        }
        catch(error) {
            //로그인 실패
            window.alert('아이디 또는 비밀번호가 잘못 되었습니다.');

        }
        
        
    }
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
                      <div className={styles.mgbt}>
                <form onSubmit={onSubmit}>
                <div className={styles.logincontainer}>
                  <h2>LOGIN</h2>
                   <input type='email' name='email' value={input.email} placeholder="email..." onChange={onChange}/>
                     <input type='password' name='password' value={input.password} placeholder="password..." onChange={onChange} />
                    <input type='submit' value = {'LOGIN'} />
                   </div>
                      <br/>
                   </form>
                   </div>
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

export default Login;
