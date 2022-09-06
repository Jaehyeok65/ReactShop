import React from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Cart.module.css'
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Footer from '../Component/Footer';
import { Transition } from 'react-transition-group';
import { UserCheck } from '../Module/UserCheck';
import CartTable from './Cart/CartTable';
import WishSelected from './WishList/WishSelected';
import WishAll from './WishList/WishAll';

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




const WishList = ( { user }) => {

    const [toggle, setToggle] = useState(false);
    const [wish, setWish] = useState([]);
    const [users, setUsers] = useState(() => 
        JSON.parse(window.sessionStorage.getItem('user')) || null
    )
    const scrollref = useRef();

    useEffect( () => {
        userCheck();
        setToggle(prev => !prev);
        setWish(JSON.parse(window.localStorage.getItem('wish')));
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },[]);

    

    const userCheck = UserCheck(users);







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
                        { wish !== null && wish.length !== 0  ?
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
                            <CartTable item={wish} setState={setWish} />
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>
                    <div className={styles.tfoots2}>
                        <WishSelected wish={wish} />
                        <WishAll wish={wish} />
                    </div>
                    <br />
                    <br />
                    <br/></div>
                       : <div>
                        <hr/>
                        <p style={{ marginBottom : '45%', textAlign : 'center', fontSize : '12px'}}>관심 상품 내역이 없습니다.</p>
                       </div> }
                    </div>)
                     }
                     </Transition>
                    </div>
                </div>
                <Footer />
            </div>

    )
}

export default React.memo(WishList);