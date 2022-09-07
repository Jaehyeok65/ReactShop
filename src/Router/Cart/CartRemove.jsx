import React from 'react';
import styles from '../../Component/Cart.module.css'
import { OnRemove } from '../../Module/OnRemove';
import { OnRemoveAll } from '../../Module/OnRemoveAll';



const CartRemove = ( { item, name, total }) => {

    const onRemove = OnRemove(item, name , total);


    return(
        <>
         <div className={styles.tfoots}>
            <p style={{ marginLeft : '8px', marginTop : '16px'}}>선택 상품을 
            <button style={{ background:  'black' , color : 'white', fontSize : '11px' }} onClick={onRemove}>삭제</button></p>
            <p>
                <button style={{ background:  'black' , color : 'white', fontSize : '11px'}} onClick = {() => OnRemoveAll('cart','total')}>
                장바구기 비우기</button>
                <button style={{margin : '4px', background : 'black', color : 'white', fontSize : '11px'}}>견적서 출력</button>
            </p>
        </div>
        </>
    )
}


export default React.memo(CartRemove);