import React, { useState, useEffect }from 'react';
import { useParams, Link } from 'react-router-dom';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import styles from '../Component/OrderDetail.module.css';
import { dbService } from '../mybase';




const OrderDetail = () => {

    const { orderid } = useParams();
    const [order, setOrder] = useState([]);


    useEffect(() => {
        getData();
        
    }, [])

    const getData = async() => {
        
        const data = await dbService.collection('shipping').where('orderid','==',orderid).get();
        data.forEach( item => {
            setOrder( prev => [...prev, item.data()]);
        })

    }

    

    

    


    return(
        <div>
            <Nav />
            <div className={styles.sort}>
                <Category />
                <div className={styles.container}>
                    <h4>주문 상세 내역</h4>
                    <table border='1px solid gray' className={styles.ordertable}>
                        <tr>
                            <th>주문일자<br/>[주문번호]</th>
                            <th>이미지</th>
                            <th>상품 정보</th>
                            <th>수량</th>
                            <th>상품구매금액</th>
                            <th>주문처리상태</th>
                            <th>취소/교환/반품</th>
                        </tr>
                        { order !== null && order.length !== 0 ? 
                             order.map((item) => (
                                item.item.map((items,index) => (
                                    <tr>
                                        <td key = {index}>{items.date}<br/>[{items.orderid}]</td>
                                        <td><Link to={`/product/${items.name}`}><img src={items.url} alt={items.name} width='110px' height='120px' /></Link></td>
                                        <td>{items.name}</td>
                                        <td>1</td>
                                        <td>{items.price}</td>
                                        <td>{items.shipstate}</td>
                                        <td>{items.canclestate}</td>
                                    </tr>
                                ))
                            ))
                         :  <tr>
                            <td colSpan={7} style={{color : 'gray'}}>주문 내역이 없습니다.</td>
                            </tr>}
                    </table>
                    </div>
            </div>
            <Footer />
        
        </div>
    )

}


export default OrderDetail;