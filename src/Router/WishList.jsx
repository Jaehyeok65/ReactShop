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




const WishList = ( { user }) => {

    const [toggle, setToggle] = useState(false);
    const [wish, setWish] = useState([]);

    useEffect( () => {
        userCheck();
        setToggle(prev => !prev);
        setWish(JSON.parse(window.localStorage.getItem('wish')));
    },[]);

    const userCheck = () => {
        if(user === null) {
            alert('로그인 후 이용가능합니다.');
            window.location.href='/login';
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

    console.log(user);

    const onRemove = () => {

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
            <div className={styles.body}>
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
                                <td className={styles.imgs}>{<img src={data.url} alt = {data.name} width='110px' height='120px' />}</td>
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
                        </tfoot>
                    </table>
                    <div className={styles.tfoots2}>
                    <p style={{ marginLeft : '8px', marginTop : '16px'}}><span style={{ fontSize : '12px'}}>선택 상품을</span> <button className={styles.wishbutton} onClick={onRemove}>삭제하기</button>
                    <button className={styles.wishbutton}>장바구니 담기</button>
                    </p>
                    <p style={{marginTop : '16px'}}><button className={styles.wishbutton}>전체상품주문</button><button className={styles.wishbutton} onClick={onRemoveAll}>관심상품 비우기</button></p>
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

export default WishList;