import React from 'react';
import styles from '../../Component/Cart.module.css'
import { OnAllBuy } from '../../Module/OnAllBuy';


const MobileCartOrder = ( { cart }) => {


    const onAllbuy = OnAllBuy(cart);

    return (
            <div className={styles.mobileorder}>
            <button onClick={onAllbuy}>ORDER</button>
            </div>
    )
}

export default React.memo(MobileCartOrder);