import React from 'react';
import styles from '../../Component/Cart.module.css'
import { OnAllBuy } from '../../Module/OnAllBuy';
import { OnRemoveAll } from '../../Module/OnRemoveAll';


const WishAll = ( { wish }) => {

    const onAllbuy = OnAllBuy(wish);


    return (
        <>
        <p style={{marginTop : '16px'}}>
            <button className={styles.wishbutton} onClick={onAllbuy}>전체상품주문</button>
            <button className={styles.wishbutton} onClick={() => OnRemoveAll(true)}>관심상품 비우기</button>
        </p>
        </>
    )
}


export default React.memo(WishAll);