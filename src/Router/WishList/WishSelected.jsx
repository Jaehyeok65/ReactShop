import React from 'react';
import styles from '../../Component/Cart.module.css'
import { WishAddItem } from './WishAddItem';
import { OnRemove } from '../../Module/OnRemove';



const WishSelected = ( { wish }) => {

    const additem = WishAddItem(wish);

    const onRemove = OnRemove(wish, 'wish');


    return(
        <>
        <p style={{ marginLeft : '8px', marginTop : '16px'}}><span style={{ fontSize : '12px'}}>선택 상품을</span>
            <button className={styles.wishbutton} onClick={onRemove}>삭제하기</button>
            <button className={styles.wishbutton} onClick={additem}>장바구니 담기</button>
        </p>
        </>
    )
}


export default React.memo(WishSelected);