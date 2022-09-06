import React from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Cart.module.css'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import Footer from '../Component/Footer';
import { Transition } from 'react-transition-group';
import { OnRemove } from '../Module/OnRemove';
import CartTable from './Cart/CartTable';
import CartOrder from './Cart/CartOrder';
import CartRemove from './Cart/CartRemove';

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


    const scrollref = useRef();
    const [total, setTotal] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        setToggle(prev => !prev);
        setCart(JSON.parse(window.localStorage.getItem('cart')));
        setTotal(JSON.parse(window.localStorage.getItem('total')));
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },[]);



    return(
            <div className={styles.body} ref={scrollref}>
                <Nav user={user} />
                <div className={styles.sort}>
                    <Category />
                    <div className={styles.cart}>
                    <Transition in={toggle} timeout={500}>
                      { (state) => 
                          (
                     <div style={{...defaultStyle,...transitionStyles[state]}}>
                        { cart !== null && cart.length !== 0 ? 
                        <div>
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
                        <CartTable cart={cart} setCart={setCart} setTotal={setTotal} />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='9'>
                                    상품구매금액 {total} + 배송비 0 = 합계 : {total}원 
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <CartRemove cart={cart} />
                    <br />
                    <br />
                    <CartOrder cart={cart} total={total} />
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

export default React.memo(Cart);