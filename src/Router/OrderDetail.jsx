import React, { useState, useEffect }from 'react';
import { useParams, Link } from 'react-router-dom';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import styles from '../Component/OrderDetail.module.css';
import { dbService } from '../mybase';
import Table from '../Module/Table';
import useAsync from '../Module/useAsync';
import { getDetailList } from '../Api/getDetailList';




const OrderDetail = () => {

    const { orderid } = useParams();


    const [states, refetch] = useAsync(() => getDetailList(orderid),[]);

    console.log(states);

    

    

    


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
                       <Table states={states}/>
                    </table>
                    </div>
            </div>
            <Footer />
        
        </div>
    )

}


export default React.memo(OrderDetail);