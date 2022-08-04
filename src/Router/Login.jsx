import React, { useEffect, useState } from "react";
import mybase from "../mybase";
import styles from '../Component/Login.module.css'
import Nav from '../Component/Nav';
import Category from "../Component/Category";
import Footer from "../Component/Footer";

function Login() {
    const authService = mybase.auth();

    //const [email, setEmail] = useState(null);
    //const [password, setPassword] = useState(null);
    const [input, setInput] = useState({
        email : '',
        password : ''
    })
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState();


    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }

    const onToggle = () => {
        setNewAccount(prev => !prev);
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                //계정 생성
                data = await authService.createUserWithEmailAndPassword(input.email, input.password);
            }
            else {
                //로그인
                data = await authService.signInWithEmailAndPassword(input.email,input.password);
            }
            console.log(data);
        }
        catch(error) {
            setError(error.message);
        }
        
        
    }
  return (
    <div className={styles.body}>
        <Nav />
        <div className={styles.sort}>
        <Category />
      <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.logincontainer}>
            <h2>{!newAccount ? 'LOGIN' : 'JOIN US'}</h2>
        <input type='email' name='email' value={input.email} placeholder="email..." onChange={onChange}/>
        <input type='password' name='password' value={input.password} placeholder="password..." onChange={onChange} />
        <input type='submit' value = { newAccount ?  'JOIN US' : 'LOGIN'} />
        </div>
        <br/>
      </form>
      <div onClick={onToggle} className={styles.spans}>{ !newAccount ? '회원가입을 원하시면 클릭하세요' : '로그인을 원하시면 클릭하세요'}</div>
      </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export default Login;
