import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Component/Orderlist.module.css';
import { Comma } from '../Product/Comma';





const OrderTable = ( { states , links }) => {
    

    


    return(
        <>
         { states.data !== null && states.data.length !== 0 ? 
                states.data.map((item) => (
                    item.item.map((items,index) => (
                        <tr>
                            {links ?  <td key = {index}>{items.date}<br/><Link to={`/orderdetail/${items.orderid}`} className={styles.textlink}>[{items.orderid}]</Link></td> :
                            <td key = {index}>{items.date}<br/>[{items.orderid}]</td> }
                            <td><Link to={`/product/${items.name}`}><img src={items.url} alt={items.name} width='110px' height='120px' /></Link></td>
                            <td>{items.name}</td>
                            <td>1</td>
                            <td>{Comma(items.price)}</td>
                            <td>{items.shipstate}</td>
                            <td>{items.canclestate}</td>
                        </tr>
                    ))
                    ))
                    : <tr>
                <td colSpan={7} style={{color : 'gray'}}>주문 내역이 없습니다.</td>
            </tr>}
        </>
    )
}


export default React.memo(OrderTable);