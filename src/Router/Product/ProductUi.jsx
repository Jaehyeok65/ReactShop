import React from 'react';
import styles from '../../Component/Home.module.css'
import { UserCheck } from '../../Module/UserCheck';
import { AddBuy } from './AddBuy';
import { AddCart } from './AddCart';
import { AddShare } from './AddShare';
import { AddWish } from './AddWish';





const ProductUi = ( { states, user }) => {

    const addbuy = AddBuy(states);
    const addcart = AddCart(states);
    const userCheck = UserCheck(user);
    const addwish = AddWish(states,userCheck);
    const addShare = AddShare(states);


    return(
        <>
        <div className={styles.button}>
                <button onClick={addbuy}>BUY NOW</button>
                <button onClick={addcart}>ADD CART</button>
                <button onClick={addwish}>WISH LIST</button>
                <button id='kakaotalk-sharing-btn' onClick={addShare}>
                <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 보내기 버튼" width='35px' height='35px' />
                </button>
        </div>
        </>
    )




}


export default React.memo(ProductUi);