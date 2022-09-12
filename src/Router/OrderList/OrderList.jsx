import React, { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import Nav from '../../Component/Nav';
import Category from '../../Component/Category';
import styles from '../../Component/Orderlist.module.css';
import Footer from '../../Component/Footer';
import useAsync  from '../../Module/useAsync';
import { getShipList } from '../../Api/getShipList';
import OrderTable from './OrderTable';
import OrderSearch from './OrderSearch';
import { InitDate } from './InitDate';
import { UserCheck } from '../../Module/UserCheck';
import { Desktop } from '../../Module/DeskTop';
import { Mobile } from '../../Module/Mobile';
import MobileOrderTable from './MobileOrderTable';


const duration = 1000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}


const transitionStyles = {
  entering: { opacity: 0 , transform : 'translate3d(0, 4%, 0)'},
  entered:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exiting:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exited:  { opacity: 0 },
};


const OrderList = () => {


    const scrollref = useRef();

    const [users, setUsers] = useState(() => 
        JSON.parse(window.sessionStorage.getItem('user')) || null
    )

    const [date, setDate] = useState({ 
        firstDate : undefined,
        secondDate : undefined
     });
     
    const [toggle, setToggle] = useState(false);

    const [states, refetch] = useAsync(() => getShipList(users,date),[]); //주문 내역을 db에서 받아옴

    useEffect(() => {
        userCheck();
        setToggle(prev => !prev);
        initDate();
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [])

   
    const initDate = InitDate(setDate); //오늘 날짜를 Formatting해서 가져옴

    const userCheck = UserCheck(users); //유저의 로그인 정보를 가져옴

    
    return (

        <div className={styles.body} ref={scrollref}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <div className={styles.container}>
            <Transition in={toggle} timeout={500}>
            { (state) => (
                <div style={{...defaultStyle,...transitionStyles[state]}}>
                    <OrderSearch date={date} setDate={setDate} refetch={refetch} />
                    <ul className={styles.list}>
                        <li>기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                        <li>주문번호를 클릭하시면 해당 주문의 상세 내역을 확인하실 수 있습니다.</li>
                        <li>취소/교환/반품 신청은 주문완료 일 기준 7일까지 가능합니다.</li>
                    </ul>
                    <h4>주문 상품 정보</h4>
                    <Desktop>
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
                       <OrderTable states={states} links = {true} />
                    </table>
                    </Desktop>
                    <Mobile>
                        <table border='1px solid gray' className={styles.ordertable}>
                        <MobileOrderTable states={states} links = {true} />
                        </table>
                    </Mobile>
                </div>
            )}
        </Transition>
        </div>
        </div>
        <Footer />
        </div>
    )
}


export default React.memo(OrderList);