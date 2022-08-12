import React from 'react';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Category from '../Component/Category';
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



const Product = ( { Goods, user } ) => {

    const { name }  = useParams();
    const [product, setProduct] = useState(() => 
        JSON.parse(window.localStorage.getItem('product')) || null
    );
    const [toggle, setToggle] = useState(false);
    const [array,setArray] = useState([]);
    //console.log(name);
    //console.log(Goods);

    
    const price = (cartarray) => {
        let money = 0;
        for(let i in cartarray) {
            money += parseInt(cartarray[i].price) * 1000;
        }

        return money;
    }

    const userCheck = () => { //관심상품에 추가하기 위해 권한이 있는지 확인
        if(user === null) {
            alert('로그인 후 이용가능합니다.');
            window.location.href='/login';
        }
    }




    const additem = () => {   //장바구니에 아이템을 추가함

        const res = JSON.parse(window.localStorage.getItem('cart')); //장바구니에 동일한 상품이 있는지 확인
        const resarray = array.concat(res); //find함수를 사용하기 위해 concat을 이용해 배열로 만듬
        let response = null;
        if(res !== null) { //res가 null이라면 find함수가 작동하지 않으므로 null이 아닌 경우에만 find함수를 사용
        response = resarray.find( item => { //장바구니 내역에서 현재 상품과 이름이 같은 아이템을 찾음
            return item.name === product.name
        })}
        if(response !== undefined && response !== null) { //undefined가 아니고 초기값 null이 아니라면 장바구니에 동일한 상품이 있는 것
            const confirm = window.confirm('장바구니에 동일한 상품이 있습니다. 상품을 추가하시겠습니까?');
            if(confirm) {
                const confirms = window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/cart"
                }
                return ; //이미 장바구니에 저장이 되어있으므로 return
            }
            return;
        }
        else {  //undefined이거나 초기값 null이라면 장바구니에 동일한 상품이 없는 것

        const confirm = window.confirm('상품을 장바구니에 추가하시겠습니까?');
        if(confirm) {
            const res = JSON.parse(window.localStorage.getItem('cart')); //기존에 장바구니에 있던 상품을 가져옴
            //console.log(res);
            if(res !== null) { //기존에 장바구니에 상품이 있다면
            const cartarray = array.concat(res); //배열을 만들어서 기존에 장바구니에 있던 상품에 현재 상품을 추가
            const cartarrays = [...cartarray, product];
            const money = price(cartarrays);
            window.localStorage.setItem('cart',JSON.stringify(cartarrays)); //새로 만든 배열을 장바구니에 추가
            window.localStorage.setItem('total',JSON.stringify(money)); //Total 머니를 장바구니에 추가
            const confirms = window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/cart"
                }
            }
            else {  //기존에 장바구니에 상품이 없다면
                const cartarrays = array.concat(product); //map함수를 사용해야하므로 배열형태로 장바구니에 추가
                const money = price(cartarrays);
                window.localStorage.setItem('cart',JSON.stringify(cartarrays)); //현재 상품만 장바구니에 추가
                window.localStorage.setItem('total',JSON.stringify(money)); //Total 머니를 장바구니에 추가
                const confirms = window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/cart"
                }
            }
        }
    }
    }

    const addwish = () => {   //장바구니에 아이템을 추가함
        
        if(user === null) {
            alert('로그인 후 관심상품을 등록하세요');
            window.location.href='/login';
            return;
        }
        const res = JSON.parse(window.localStorage.getItem('wish')); //장바구니에 동일한 상품이 있는지 확인
        const resarray = array.concat(res); //find함수를 사용하기 위해 concat을 이용해 배열로 만듬
        let response = null;
        if(res !== null) { //res가 null이라면 find함수가 작동하지 않으므로 null이 아닌 경우에만 find함수를 사용
        response = resarray.find( item => { //장바구니 내역에서 현재 상품과 이름이 같은 아이템을 찾음
            return item.name === product.name
        })}
        if(response !== undefined && response !== null) { //undefined가 아니고 초기값 null이 아니라면 장바구니에 동일한 상품이 있는 것
            const confirm = window.confirm('관심상품에 동일한 상품이 있습니다. 상품을 추가하시겠습니까?');
            if(confirm) {
                alert('관심상품에 등록되었습니다.');
                return ; //이미 장바구니에 저장이 되어있으므로 return
            }
            return;
        }
        else {  //undefined이거나 초기값 null이라면 장바구니에 동일한 상품이 없는 것

        const confirm = window.confirm('상품을 관심상품에 추가하시겠습니까?');
        if(confirm) {
            const res = JSON.parse(window.localStorage.getItem('wish')); //기존에 장바구니에 있던 상품을 가져옴
            //console.log(res);
            if(res !== null) { //기존에 장바구니에 상품이 있다면
            const wisharray = array.concat(res); //배열을 만들어서 기존에 장바구니에 있던 상품에 현재 상품을 추가
            const wisharrays = [...wisharray, product];
            window.localStorage.setItem('wish',JSON.stringify(wisharrays)); //새로 만든 배열을 장바구니에 추가
            const confirms = window.confirm('관심상품에 추가되었습니다. 관심상품으로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/wish";
                }
            }
            else {  //기존에 장바구니에 상품이 없다면
                const wisharrays = array.concat(product); //map함수를 사용해야하므로 배열형태로 장바구니에 추가
                window.localStorage.setItem('wish',JSON.stringify(wisharrays)); //현재 상품만 장바구니에 추가
                const confirms = window.confirm('관심상품에 추가되었습니다. 관심상품으로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/wish";
                }
            }
        }
    }
    }

  
    

    const find = () => {
        for(let i in Goods) {
            if(Goods[i].name === name) {
                setProduct(Goods[i]);
                window.localStorage.setItem("product",JSON.stringify(Goods[i]));
                break;
            }
        }
    }
    
    useEffect( () => {
        find();
        setToggle(prev => !prev);
        //window.localStorage.setItem("product",JSON.stringify(product));
    },[])

    //console.log(product);

    
    return (
        <>
        <div className={styles.body}>
            <Nav user={user} />
            <div className={styles.sort}>
            <Category />
            <Transition in={toggle} timeout={500} appear>
                { (state =>  (
                    <div style={ {...defaultStyle, ...transitionStyles[state]}}>
                     <div className={styles.container}>
                     <div className={styles.fonts}>
                         <p>{product !== null ? product.name : null}</p>
                         <p>{product !== null ? product.price : null}원</p>
                         <p>3,000원 (50,000원 이상 구매 시 무료)</p>
                         <br/>
                         <p>PRODUCT INFO &gt;</p>
                         <p>SHIPPING INFO &gt;</p>
                         <p>SIZEGUIDE INFO &gt;</p>
                         <br/>
                         <h5>TOTAL &nbsp;:&nbsp; {product !== null ? product.price : null}원</h5>
                         <div className={styles.button}>
                             <button>BUY NOW</button>
                             <button onClick={additem}>ADD CART</button>
                             <button onClick={addwish}>WISH LIST</button>
                         </div>
                     </div>
                     <div className={styles.images}>
                         <img src={product !== null ? product.url : null} alt='이미지' />
                     </div>
                 </div>
                 </div>
                ))}
                </Transition>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Product;