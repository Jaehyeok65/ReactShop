import React from 'react';
import styles from '../../Component/Login.module.css'
import { useChange } from '../../Module/useChange';
import { OnLoginSubmit } from './OnLoginSubmit';






const LoginForm = ( { input, setInput, authService }) => {

    const onChange = useChange(input, setInput);

    const onSubmit = OnLoginSubmit(authService, input);
    
    


    return(
        <>
         <div className={styles.loginform}>
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
        </>
    )
}


export default React.memo(LoginForm);