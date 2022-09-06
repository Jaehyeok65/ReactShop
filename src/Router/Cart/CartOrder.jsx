import React from 'react';
import styles from '../../Component/Cart.module.css'
import { OnAllBuy } from '../../Module/OnAllBuy';
import { OnSelectBuy } from '../../Module/OnSelectBuy';


const CartOrder = ( { total, cart }) => {


    const onAllbuy = OnAllBuy(cart);


    const onSelectbuy = OnSelectBuy(cart);

    return (
        <>
            <table border = "1px solid gray" className={styles.secondtable}>
                        <thead>
                            <tr>
                                <th>총 상품금액</th>
                                <th>총 배송비</th>
                                <th>결제 예정 금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{total}원</td>
                                <td>+ 0원</td>
                                <td>= {total}원</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.order}>
                    <button onClick={onAllbuy}>전체상품주문</button>
                    <button onClick={onSelectbuy}>선택상품주문</button>
                    </div>
                    <br/>
        </>
    )
}

export default React.memo(CartOrder);