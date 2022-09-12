import React, { useState, useEffect, useRef } from 'react';
import Nav from '../../Component/Nav';
import Category from '../../Component/Category';
import styles from '../../Component/Cart.module.css'
import { Transition } from 'react-transition-group';
import Footer from '../../Component/Footer';
import Shipinfo from './Shipinfo';
import Paymentway from './Paymentway';
import { OnSubmit } from './OnSubmit';
import { OnTest } from './OnTest';
import CartTable from '../Cart/CartTable';
import CartRemove from '../Cart/CartRemove';
import PayOrdertable from './PayOrdertable';
import { Comma } from '../Product/Comma';
import { Desktop } from '../../Module/DeskTop';
import { Mobile } from '../../Module/Mobile';
import MobileCartTable from '../Cart/MobileCartTable';



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

    const [pay, setPay] = useState(() => JSON.parse(window.localStorage.getItem('payment')) || null) //로컬스토리지에서 결제 정보를 가져옴
    const [user, setUser] = useState(() => JSON.parse(window.sessionStorage.getItem('user')) || null); //세션스토리지에서 유저 정보를 가져옴
    const [toggle, setToggle] = useState(false);
    const [paytotal, setPaytotal] = useState(() => JSON.parse(window.localStorage.getItem('paytotal')) || null);
    
    const [ship, setShip] = useState({
        name : JSON.parse(window.sessionStorage.getItem('user')) ? JSON.parse(window.sessionStorage.getItem('user')).displayName : '',  //주문자 이름
        postcode : '', //우편 번호
        address : '',  //배송 주소
        phone : { first : '010', second : '', third : ''}, //주문자 핸드폰
        email : { first : '', second : ''}, //주문자 이메일
        message : '' //요청사항 (필수x)
    });

    //console.log(JSON.parse(window.sessionStorage.getItem('user')));

    const scrollref = useRef();
    const nameInput = useRef();
    const postcodeInput = useRef();
    const addressInput = useRef();
    const firstphoneInput = useRef();
    const secondphoneInput = useRef();
    const thirdphoneInput = useRef();
    const firstemailInput = useRef();
    const secondemailInput = useRef();
    



    useEffect( () => {
        if(user === null) {
            alert('로그인 후 이용 가능합니다.');
            window.location.href=`${process.env.PUBLIC_URL}/login`;
        }
        onToggle();
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },[])

    const onToggle = () => {
        setToggle(prev => !prev);
    }


    const onTest = OnTest(ship,nameInput,postcodeInput,addressInput,firstphoneInput,secondphoneInput,thirdphoneInput,firstemailInput,secondemailInput);
    
    const onSubmit = OnSubmit(ship,paytotal,pay,user);

    
    

    return (
        <div className={styles.body} ref={scrollref}>
        <Nav user={user} />
        <div className={styles.sort}>
            <Category />
            <div className={styles.cart}>
            <Transition in={toggle} timeout={500}>
              { (state) => 
                  (
             <div style={{...defaultStyle,...transitionStyles[state]}}>
                { pay !== null && pay.length !== 0 ? <div>
                <Desktop>
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
                 <CartTable item={pay} setState={setPay} setTotal={setPaytotal} />
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='9' style={{textAlign : 'center'}}>
                            상품구매금액 {Comma(paytotal)} + 배송비 0 = 합계 : {Comma(paytotal)}원 
                        </td> 
                    </tr>
                </tfoot>
            </table>
                <CartRemove item={pay} name='payment' total='paytotal' />
                </Desktop>
                <Mobile>
                    <table border="1px sold gray">
                        <MobileCartTable item={pay} setState={setPay} setTotal={setPaytotal} name='payment' total='paytotal' />
                    </table>
                </Mobile>
            <br />
            <br />
            <Shipinfo ship={ship} setShip={setShip} nameInput={nameInput} addressInput={addressInput} 
                firstphoneInput={firstphoneInput} secondphoneInput={secondphoneInput} postcodeInput={postcodeInput}
                thirdphoneInput={thirdphoneInput} firstemailInput={firstemailInput} secondemailInput={secondemailInput}
                />
            <h4 style={{marginTop : '7%', fontSize : '12px'}}>결제 예정 금액</h4>
                <PayOrdertable paytotal={paytotal} />
                <Paymentway paytotal={paytotal} onTest={onTest} onSubmit={onSubmit}   />
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


export default React.memo(Payment);