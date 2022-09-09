import React from 'react';
import { OnJoinChange } from './OnJoinChange';
import styles from '../../Component/Login.module.css'
import { OnJoinSubmit } from './OnJoinSubmit';
import { OnJoinTest } from './OnJoinTest';
import mybase from '../../mybase';







const JoinForm = ( { input, setInput, emailInput, passwordInput, confirmInput, nameInput, joininput, firstphoneInput,
                     secondphoneInput, thirdphoneInput}) => {

    const authService = mybase.auth();
    authService.setPersistence('session');

    const onChange = OnJoinChange(input, setInput);

    const onTest = OnJoinTest(input, joininput, emailInput, passwordInput, confirmInput, nameInput, firstphoneInput,
        secondphoneInput, thirdphoneInput);

    const onSubmit = OnJoinSubmit(authService, input, onTest);


    return(
        <>
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
        </>
    )
}


export default React.memo(JoinForm);