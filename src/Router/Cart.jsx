import React from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Cart.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../Component/Footer';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';

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




const Cart = ( { user }) => {

    const [total, setTotal] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        setToggle(prev => !prev);
        setCart(JSON.parse(window.localStorage.getItem('cart')));
        setTotal(JSON.parse(window.localStorage.getItem('total')));
    },[]);

    const onChange = (e) => {

        const array = [...cart];
        for(let i in array) {
            if(array[i].name === e.name) {
                array[i].check = !array[i].check;
            }
        }
        setCart(array);
    }

    const onCheck = () => {
        const array = [...cart];
        for(let i in array) {
            if(array[i].check === true) {
                return false;
            }
        }
        return true;
    }

    const onAllbuy = () => {
        let price = 0;
        for(let i in cart) {
            price += parseInt(cart[i].price) * 1000;
        }
        window.localStorage.setItem('pay',JSON.stringify(cart));
        window.localStorage.setItem('paytotal',JSON.stringify(price));
        window.location.href='/payment';
    }

    const onSelectbuy = () => {
        const check = onCheck();
        if(check) {
            alert('선택된 상품이 없습니다.');
            return;
        }
        const array = cart.filter(item => item.check === true);
        let price = 0;
        for(let i in array) {
            price += parseInt(array[i].price) * 1000;
        }
        window.localStorage.setItem('pay',JSON.stringify(array));
        window.localStorage.setItem('paytotal',JSON.stringify(price));
        window.location.href='/payment';
    }

    //console.log(cart);

    const onRemove = () => {

        const checks = onCheck();
        if(checks) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        const res = window.confirm('선택하신 상품을 삭제하시겠습니까?');

        if(res) {
        const array = cart.filter(item => item.check === false);
        let price = 0;
        for(let i in array) {
            price += parseInt(array[i].price) * 1000;
        }
        
        window.localStorage.setItem('total',JSON.stringify(price));
        window.localStorage.setItem('cart',JSON.stringify(array));
        window.location.href = "/cart";
        }
    }

    const onRemoveAll = () => {
        const response = window.confirm('장바구니를 비우시겠습니까? ')
        if(response) {
        window.localStorage.removeItem('cart');
        window.localStorage.removeItem('total');
        window.location.href='/cart';
        }
    }




    return(
            <div className={styles.body}>
                <Nav user={user} />
                <div className={styles.sort}>
                    <Category />
                    <div className={styles.cart}>
                    <Transition in={toggle} timeout={500}>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                        { cart !== null && cart.length !== 0 ? <div>
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
                            { cart !== null ?  cart.map( (data, index) => (
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
                                <td colSpan='9'>
                                    상품구매금액 {total} + 배송비 0 = 합계 : {total}원 
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className={styles.tfoots}>
                    <p style={{ marginLeft : '8px', marginTop : '16px'}}>선택 상품을 <button style={{ background:  'black' , color : 'white', fontSize : '11px' }} onClick={onRemove}>삭제</button></p>
                    <p><button style={{ background:  'black' , color : 'white', fontSize : '11px'}} onClick = {onRemoveAll}>장바구기 비우기</button><button style={{margin : '4px', background : 'black', color : 'white', fontSize : '11px'}}>견적서 출력</button></p>
                    </div>
                    <br />
                    <br />
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
                    </div> : <div><p style={{marginBottom : '50%', textAlign : 'center', fontSize : '12px', color : 'gray'}}>장바구니가 비어있습니다.</p></div>
                            }
                    </div>)
                     }
                     </Transition>
                    </div>
                </div>
                <Footer />
            </div>

    )
}

export default Cart;