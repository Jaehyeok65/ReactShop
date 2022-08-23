import React from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Cart.module.css'
import { useState } from 'react';
import { useEffect, useRef } from 'react';
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

    const userCheck = () => {
        if(users === null) {
            alert('로그인 후 이용가능합니다.');
            window.location.href='/login';
        }
    }

    const onCheck = () => {
        const array = [...wish];
        for(let i in array) {
            if(array[i].check === true) {
                return false;
            }
        }
        return true;
    }

    const price = (cartarray) => {
        let money = 0;
        for(let i in cartarray) {
            money += parseInt(cartarray[i].price);
        }

        return money;
    }

    //console.log(wish);



    const additem = () => {   //장바구니에 아이템을 추가함

        const checks = onCheck();

        if(checks) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        const confirm = window.confirm('해당 상품을 장바구니에 추가하시겠습니까?');

        if(confirm) {
        let array = []; //concat을 위해 빈 배열 선언
        const res = JSON.parse(window.localStorage.getItem('cart')); //장바구니에 동일한 상품이 있는지 확인
        const resarray = array.concat(res); //find함수를 사용하기 위해 concat을 이용해 배열로 만듬
        let response = []; //장바구니에 중복되지 않는 상품을 담는 배열
        let checked = []; //체크된 배열을 담는 배열
        let response2 = [] //장바구니에 중복되는 상품을 담는 배열
        if(res !== null) {  //장바구니에 상품이 있을 경우 
            checked = wish.filter( item => item.check === true);
            for(let i in checked) {
                for(let j in resarray) {
                    if(checked[i].name === resarray[j].name) {
                        response2.push(checked[i]);
                    }
                }
            }
            for(let i in checked) {
                if(response2.find(item => item.name === checked[i].name) === undefined) { //중복되는 상품 배열
                    response.push(checked[i]);
                }
            }

            response = response.concat(resarray);
        }
        else if(res === null) {
            response = wish.filter( item => item.check === true); //장바구니에 상품이 없을 경우 wishlist에 체크된 상품만 장바구니에 추가
        }
        const total = price(response);
        
        const responses = response.map(item => ( {
            ...item,
            check : false
        } //장바구니에 선택된 상태로 저장하면 안되므로 모든 check를 false로 초기화 
        ));

        

        window.localStorage.setItem('cart',JSON.stringify(responses)); //새로운 response를 cart 장바구니에 저장.
        window.localStorage.setItem('total',JSON.stringify(total));

        const confirms = window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?');

        if(confirms) {
            window.location.href='/cart';
        }
    }
       

    }

    const onChange = (e) => {

        const array = [...wish];
        for(let i in array) {
            if(array[i].name === e.name) {
                array[i].check = !array[i].check;
            }
        }
        setWish(array);
    }

    const onAllbuy = () => {
        let price = 0;
        for(let i in wish) {
            price += parseInt(wish[i].price);
        }
        window.localStorage.setItem('pay',JSON.stringify(wish));
        window.localStorage.setItem('paytotal',JSON.stringify(price));
        window.location.href='/payment';
    }


    const onRemove = () => {

        const checks = onCheck();

        if(checks) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        const res = window.confirm('선택하신 상품을 삭제하시겠습니까?');

        if(res) {
        const array = wish.filter(item => item.check === false);
        
        window.localStorage.setItem('wish',JSON.stringify(array));
        window.location.href = "/wish";
        }
    }

    const onRemoveAll = () => {
        const response = window.confirm('관심상품을 비우시겠습니까? ')
        if(response) {
        window.localStorage.removeItem('wish');
        window.location.href='/wish';
        }
    }




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
                            { wish !== null ?  wish.map( (data, index) => (
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
                        </tfoot>
                    </table>
                    <div className={styles.tfoots2}>
                    <p style={{ marginLeft : '8px', marginTop : '16px'}}><span style={{ fontSize : '12px'}}>선택 상품을</span> <button className={styles.wishbutton} onClick={onRemove}>삭제하기</button>
                    <button className={styles.wishbutton} onClick={additem}>장바구니 담기</button>
                    </p>
                    <p style={{marginTop : '16px'}}><button className={styles.wishbutton} onClick={onAllbuy}>전체상품주문</button><button className={styles.wishbutton} onClick={onRemoveAll}>관심상품 비우기</button></p>
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