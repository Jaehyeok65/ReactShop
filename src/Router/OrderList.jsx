import React, { useState, useEffect, useRef } from 'react';
import { dbService } from '../mybase';
import { Transition } from 'react-transition-group';
import Nav from '../Component/Nav';
import Category from '../Component/Category';
import styles from '../Component/Orderlist.module.css';
import Footer from '../Component/Footer';


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

const btn = {
    border : 'none',
    fontWeight : 'bold',
    background : 'white',
    textDecoration:'underline',
    textUnderlineOffset: '20px',
    transform: 'translateY(-3px)'
}

const btn1 = {
    border : 'none',
    background : 'white',
}

const OrderList = () => {


    const scrollref = useRef();
    const [order, setOrder] = useState([]); //주문 내역을 확인
    const [users, setUsers] = useState(() => 
        JSON.parse(window.sessionStorage.getItem('user')) || null
    )
    const [btnstate, setBtnstate] = useState(true);
    const [date, setDate] = useState({ 
        firstDate : undefined,
        secondDate : undefined
     });
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        userCheck();
        setToggle(prev => !prev);
        initDate();
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [])


    const Formatting = (source, delimiter = '-') => {
        const year = source.getFullYear();
        let month = (source.getMonth() + 1);
        if(parseInt(month) < 10 && parseInt(month) > 0) {
            month = '0' + month;
        }
        const day = (source.getDate());
    
        return [year, month, day].join(delimiter);
    }

    const initDate = () => {
        const first = Formatting(new Date());
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 3);
        const day = today.getDate();
        const second = Formatting(new Date(year,month,day));
        setDate( {
            firstDate : first,
            secondDate : second
        })
    }


    

    const onChange = (e) => {
        const { name , value } = e.target;
        const response = {
            ...date,
            [name] : value
        }
        setDate(() => response);
    }


    const getShipping = async() => {
        setOrder([]); //조회를 눌렀을 때 이전 데이터가 중복 되는 것을 방지하기 위해 orderlist를 비우고 data를 받아옴.
        const data = await dbService.collection('shipping').where('uid','==', users.uid).where('date','>=', date.firstDate).where('date','<=',date.secondDate).get();
        data.forEach( item => {
            setOrder( prev => [...prev, item.data()]);
        })
    }


    

    const userCheck = () => {
        if(users === null) {
            alert('로그인 후 이용가능합니다.');
            window.location.href='/login';
        }
    }

    const onBtnClick1 = () => {
        setBtnstate(true);
    }

    const onBtnClick2 = () => {
        setBtnstate(false);
    }

    const ordercheck = () => {
        if(order.length > 0) {
            console.log(order[0].date >= date.firstDate);
            //console.log(date.firstDate);
        }
    }



    

    

    return (
        <div className={styles.body} ref={scrollref}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <div className={styles.container}>
            <Transition in={toggle} timeout={500}>
            { (state) => (
                <div style={{...defaultStyle,...transitionStyles[state]}}>
                    <p><button style={ btnstate ? btn : btn1 } onClick={onBtnClick1}>주문내역조회</button><span style={{marginRight : '32px'}}></span><button style={ btnstate ? btn1 : btn} onClick={onBtnClick2}>취소/반품/교환 내역</button></p>
                    <p className={styles.date}><input type='date' name='firstDate' value={date.firstDate} onChange={onChange} /> ~ <input type='date' name='secondDate' value={date.secondDate} onChange={onChange}/>
                    <button className={styles.btn} onClick={getShipping}>조회</button>
                    <button onClick={ordercheck}>확인</button>
                    </p>
                    <ul className={styles.list}>
                        <li>기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                        <li>주문번호를 클릭하시면 해당 주문의 상세 내역을 확인하실 수 있습니다.</li>
                        <li>취소/교환/반품 신청은 주문완료 일 기준 7일까지 가능합니다.</li>
                    </ul>
                    <h4>주문 상품 정보</h4>
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
                             order.map((item, index) => (
                                item.item.map((items) => (
                                    <tr>
                                        <td key = {index}>{items.date}<br/>[{items.orderid}]</td>
                                        <td><img src={items.url} alt={items.name} width='110px' height='120px' /></td>
                                        <td>{items.name}</td>
                                        <td>1</td>
                                        <td>{items.price}</td>
                                        <td>배송중</td>
                                        <td>불가</td>
                                    </tr>
                                ))
                            ))
                         :  <tr>
                            <td colSpan={7} style={{color : 'gray'}}>주문 내역이 없습니다.</td>
                            </tr>}
                    </table>
                </div>
            )}
        </Transition>
        </div>
        </div>
        <Footer />
        </div>
    )
}


export default OrderList;