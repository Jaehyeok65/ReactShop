import React, { useState, useEffect } from 'react';
import Nav from '../Component/Nav';
import Category from '../Component/Category';
import styles from '../Component/Cart.module.css'
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Footer from '../Component/Footer';
import Kakao from '../Component/Kakao';
import Toss from '../Component/Toss';
import Shipinfo from '../Component/Shipinfo';
import Paymentway from '../Component/Paymentway';

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



const Payment = () => {

    const [pay, setPay] = useState(() => JSON.parse(window.localStorage.getItem('pay')) || null) //로컬스토리지에서 결제 정보를 가져옴
    const [user, setUser] = useState(() => JSON.parse(window.sessionStorage.getItem('user')) || null); //세션스토리지에서 유저 정보를 가져옴
    const [toggle, setToggle] = useState(false);
    const [paytotal, setPaytotal] = useState(() => JSON.parse(window.localStorage.getItem('paytotal')) || null);
    
    const [ship, setShip] = useState({
        name : '',  //주문자 이름
        postcode : '', //우편 번호
        address : '',  //배송 주소
        phone : { first : '', second : '', third : ''}, //주문자 핸드폰
        email : { first : '', second : ''}, //주문자 이메일
        message : '' //요청사항 (필수x)
    });


    useEffect( () => {
        if(user === null) {
            alert('로그인 후 이용 가능합니다.');
            window.location.href = '/login';
        }
        onToggle();
    },[])

    const onToggle = () => {
        setToggle(prev => !prev);
    }

    const onCheck = () => {
        const array = [...pay];
        for(let i in array) {
            if(array[i].check === true) {
                return false;
            }
        }
        return true;
    }

    const onChange = (e) => {

        const array = [...pay];
        for(let i in array) {
            if(array[i].name === e.name) {
                array[i].check = !array[i].check;
            }
        }
        setPay(array);
    }

    const onRemove = () => {

        const checks = onCheck();
        if(checks) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        const res = window.confirm('선택하신 상품을 삭제하시겠습니까?');

        if(res) {
        const array = pay.filter(item => item.check === false);
        let price = 0;
        for(let i in array) {
            price += parseInt(array[i].price) * 1000;
        }
        
        window.localStorage.setItem('paytotal',JSON.stringify(price));
        window.localStorage.setItem('pay',JSON.stringify(array));
        window.location.href = "/payment";
        }
    }

    const onRemoveAll = () => {
        const response = window.confirm('장바구니를 비우시겠습니까? ')
        if(response) {
        window.localStorage.removeItem('pay');
        window.localStorage.removeItem('paytotal');
        window.location.href='/payment';
        }
    }

    const onTest = () => {
        if(ship.name === '') {
            alert('수령자 이름을 입력해주세요');
            return false;
        }
    }

    
    

    return (
        <div className={styles.body}>
        <Nav user={user} />
        <div className={styles.sort}>
            <Category />
            <div className={styles.cart}>
            <Transition in={toggle} timeout={500}>
              { (state) => 
                  (
             <div style={{...defaultStyle,...transitionStyles[state]}}>
                { pay !== null && pay.length !== 0 ? <div>
               <table border = "1px solid gray">
                <thead>
                <tr>
                    <th></th>
                    <th>이미지</th>
                    <th>상품정보</th>
                    <th>판매가</th>
                    <th>수량</th>
                    <th>적립금</th>
                    <th>배송비</th>
                    <th>합계</th>
                </tr>
                </thead>
                <tbody>
                    { pay !== null ?  pay.map( (data, index) => (
                    <tr key={index}>
                        <td>{<input type='checkbox' name='check' value={data.check} onChange={() => onChange(data)} />}</td>
                        <td className={styles.imgs}><Link to={`product/${data.name}`}>{<img src={data.url} alt = {data.name} width='110px' height='120px' />}</Link></td>
                        <td><Link to={`product/${data.name}`} className={styles.textlink}>{data.name}</Link></td>
                        <td>{data.price}원</td>
                        <td>{1}</td>
                        <td>{0}</td>
                        <td>{0}</td>
                        <td>{data.price}원</td>
                    </tr>
                )) : null }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='9' style={{textAlign : 'center'}}>
                            상품구매금액 {paytotal} + 배송비 0 = 합계 : {paytotal}원 
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className={styles.tfoots}>
            <p style={{ marginLeft : '8px', marginTop : '16px'}}>선택 상품을 <button style={{ background:  'black' , color : 'white', fontSize : '11px' }} onClick={onRemove}>삭제</button></p>
            <p><button style={{ background:  'black' , color : 'white', fontSize : '11px'}} onClick = {onRemoveAll}>결제항목 비우기</button><button style={{margin : '4px', background : 'black', color : 'white', fontSize : '11px'}}>견적서 출력</button></p>
            </div>
            <br />
            <br />
            <Shipinfo ship={ship} setShip={setShip} />
            <h4 style={{marginTop : '7%', fontSize : '12px'}}>결제 예정 금액</h4>
                <table border='1' className={styles.paytable}>
                    <tr>
                        <th>총 주문 금액</th>
                        <th>총 할인 + 부가 결제 금액</th>
                        <th>총 결제 금액</th>
                    </tr>
                    <tr>
                        <td>{paytotal}</td>
                        <td>0</td>
                        <td>={paytotal}</td>
                    </tr>
                </table>
                <table border='1' className={styles.paytable2}>
                    <tr>
                        <td>총 할인 금액</td>
                        <td colSpan={2}>0원</td>
                    </tr>
                    <tr>
                        <td>총 부가 결제 금액</td>
                        <td>0원</td>
                    </tr>
                </table>
                <Paymentway paytotal={paytotal} pay={pay} onTest={onTest} />
            <br/>
            </div> : <div><p style={{marginBottom : '50%', textAlign : 'center', fontSize : '12px', color : 'gray'}}>결제항목이 비어있습니다.</p></div>
                    }
            </div>)
             }
             </Transition>
            </div>
        </div>
        <Footer />
    </div>)


}


export default Payment;