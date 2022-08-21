import React, { useEffect, useState, useRef } from "react";
import mybase from "../mybase";
import styles from '../Component/Login.module.css'
import Nav from '../Component/Nav';
import Category from "../Component/Category";
import Footer from "../Component/Footer";
import { Transition } from 'react-transition-group';
import Joininfo from "../Component/Joininfo";


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

function Join( { user , joininfo }) {
    const authService = mybase.auth();
    authService.setPersistence('session');

    //const [email, setEmail] = useState(null);
    //const [password, setPassword] = useState(null);
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

    const joincheck = () => {

      const res = {...joininput};
      setJoininput({
        first : !res.first,
        second : !res.second,
        third : !res.third,
        four : !res.four
      })
    }

    const onTest = () => {
      if(joininput.first === false || joininput.second === false) {
        alert('회원가입 약관에 동의해주세요.');
        return false;
      }

      else if(input.email === '') {
          alert('이메일을 입력해주세요.');
          emailInput.current.focus();
          return false;
      }
      else if(input.password === '') {
          alert('비밀번호를 입력해주세요.');
          passwordInput.current.focus();
          return false;
      }
      else if(input.confirm === '') {
          alert('비밀번호 확인란을 입력해주세요.');
          confirmInput.current.focus();
          return false;
      }

      else if(input.displayname === '') {
        alert('이름을 입력해주세요.');
        nameInput.current.focus();
        return false;
        
       }

      else if(input.phone.first === '' || input.phone.second === '' || input.phone.third === '') {
          alert('전화번호를 입력해주세요.');
          if(input.phone.first === '') {
              firstphoneInput.current.focus();
          }
          else if(input.phone.second === '') {
              secondphoneInput.current.focus();
          }
          else if(input.phone.third === '') {
              thirdphoneInput.current.focus();
          }
          return false;
      }

      else if(input.password !== input.confirm) {
        alert('비밀번호를 확인해주세요.');
        passwordInput.current.focus();
        return false;
      }

      return true;
  }

    const onJoinChange = (e) => {
      const { name , value } = e.target;
      let data;
      if(value === 'false') {
        data = true
      }
      else {
        data = false
      }
      setJoininput({
        ...joininput,
        [name] : data
      })
    }




    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === 'first' || name === 'second' || name === 'third') {
          const res = {
            ...input,
            phone : {
              ...input.phone,
              [name] : value
            }
          }
          setInput(res);
        }
        else {
        setInput({
            ...input,
            [name] : value
        })
      }
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        const test = onTest();
        if(!test) {
          return;
        }
        try {
            //계정 생성
            const data = await authService.createUserWithEmailAndPassword(input.email, input.password);
            if(data) {
              const user = data.user;
              user.updateProfile({
                displayName : input.displayname
              })
              alert('회원가입이 완료되었습니다.');
              window.location.href='/';
            }
        }
        catch(error) {
            alert(error);
        }
        
        
    }
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
                        <Joininfo joininput={joininput} joincheck={joincheck} onJoinChange={onJoinChange}/>
                      <div className={styles.mgbt}>
                      <form onSubmit={onSubmit}>
                        <p style={{fontSize : '12px'}}>EMAIL</p>
                        <p><input type='email' name='email' value={input.email}  onChange = {onChange} ref={emailInput}/></p>
                        <p style={{fontSize : '12px'}}>PASSWORD</p>
                        <p><input type='password' name='password' value={input.password}  onChange = {onChange} ref={passwordInput}/></p>
                        <p style={{fontSize : '12px'}}>CONFIRM</p>
                        <p><input type='password' name='confirm' value={input.confirm}  onChange = {onChange} ref={confirmInput}/></p>
                        <p style={{fontSize : '12px'}}>NAME</p>
                        <p><input type='text' name='displayname' value={input.displayname}  onChange = {onChange} ref={nameInput}/></p>
                        <p style={{fontSize : '12px'}}>MOBILE</p>
                        <p className={styles.phone}> 
                        <select name='first' value={input.phone.first} style={{height : '22px'}} onChange = {onChange} ref={firstphoneInput}>
                          <option value='010'>010</option>
                          <option value='011'>011</option>
                          <option value='016'>016</option>
                          <option value='017'>017</option>
                          <option value='018'>018</option>
                          <option value='019'>019</option>
                        </select>&nbsp;
                        - <input type='tel' name ='second' value={input.phone.second}  onChange = {onChange} autoComplete='off' ref={secondphoneInput} /> - <input type='tel' name='third' value={input.phone.third} onChange = {onChange} autoComplete='off' ref={thirdphoneInput}/> 
                     </p>
                     <input type='submit' value='JOIN US' className={styles.submits}/>
            </form>

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

export default Join;
