import React, { useState, useCallback } from 'react';
import styles from '../../Component/Orderlist.module.css';
import { useChange } from '../../Module/useChange';
 

const btn = {
    border : 'none',
    fontWeight : 'bold',
    background : 'white',
    textDecoration:'underline',
    textUnderlineOffset: '20px',
    transform: 'translateY(-3px)'
}

const btn1 = {
    border : 'none',
    background : 'white',
}


const OrderSearch = ( { refetch, date, setDate}) => {

    const [btnstate, setBtnstate] = useState(true);

    const onBtnClick1 = useCallback(() => {
        setBtnstate(true);
    },[btnstate]);

    const onBtnClick2 = useCallback(() => {
        setBtnstate(false);
    },[btnstate]);


    const onChange = useChange(date, setDate);

    return(
        <>
        <p><button style={ btnstate ? btn : btn1 } onClick={onBtnClick1}>주문내역조회</button><span style={{marginRight : '32px'}}></span><button style={ btnstate ? btn1 : btn} onClick={onBtnClick2}>취소/반품/교환 내역</button></p>
            <p className={styles.date}><input type='date' name='firstDate' value={date.firstDate} onChange={onChange} /> ~ <input type='date' name='secondDate' value={date.secondDate} onChange={onChange}/>
            <button className={styles.btn} onClick={refetch}>조회</button>
        </p>
        </>
    )
}

export default React.memo(OrderSearch);