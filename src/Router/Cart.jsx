import React from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Cart.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Footer from '../Component/Footer';
import { Transition } from 'react-transition-group';

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




const Cart = () => {

    const [total, setTotal] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        setToggle(prev => !prev);
        setCart(JSON.parse(window.localStorage.getItem('cart')));
        Total();
    },[])

    const Total = () => {
        let price = 0;
        console.log(cart);
        for(let i in cart) {
            console.log(cart[i]);
        }
        console.log(price);
    }


    return(
            <div className={styles.body}>
                <Nav />
                <div className={styles.sort}>
                    <Category />
                    <div className={styles.cart}>
                    <Transition in={toggle} timeout={500}>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                       <table border = "1px solid gray">
                        <thead>
                        <tr>
                            <th><input type='checkbox' /></th>
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
                                <td>{<input type='checkbox' value={data.check} />}</td>
                                <td className={styles.imgs}>{<img src={data.url} alt = {data.shopinfo} width='110px' height='120px' />}</td>
                                <td>{data.name}</td>
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
                    <p style={{ marginLeft : '8px', marginTop : '16px'}}>선택 상품을 <button style={{ background:  'black' , color : 'white', fontSize : '11px' }}>삭제</button></p>
                    <p><button style={{ background:  'black' , color : 'white', fontSize : '11px'}}>장바구기 비우기</button><button style={{margin : '4px', background : 'black', color : 'white', fontSize : '11px'}}>견적서 출력</button></p>
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
                    <button>전체상품주문</button>
                    <button>선택상품주문</button>
                    </div>
                    <br/>
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