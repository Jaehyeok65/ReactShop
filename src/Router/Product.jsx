import React from 'react';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import { Transition } from 'react-transition-group';
import Reviews from '../Component/Reviews';

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
    const scrollref = useRef();
    //console.log(name);
    //console.log(Goods);

    useEffect( () => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        find();
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        //window.localStorage.setItem("product",JSON.stringify(product));
       return () => document.body.removeChild(script);
    },[])

    const addShare = () => {

        if(window.Kakao) {
            const kakao = window.Kakao;

            if(!kakao.isInitialized()) {
                kakao.init("ae36ac4f82f003aa0e94fd1266270445");
            }

            kakao.Share.createDefaultButton({
                container: '#kakaotalk-sharing-btn',
                objectType: 'feed',
                content: {
                  title: product.name,
                  description: '의류',
                  imageUrl:
                    product.url,
                  link: {
                    mobileWebUrl: 'http://localhost:3000/login',
                    androidExecutionParams: 'test',
                    webUrl : 'http://localhost:3000/login'
                  },
                },
                buttons: [
                  {
                    title: '웹으로 이동',
                    link: {
                      mobileWebUrl: 'http://localhost:3000/login',
                      webUrl : `http://localhost:3000/product/${product.name}`
                    },
                  },
                ]
              });

        }
    }

   

    

    

    

    
    const price = (cartarray) => {
        let money = 0;
        for(let i in cartarray) {
            money += parseInt(cartarray[i].price)
        }

        return money;
    }

    const comma = (price) => {
        let i = 0;
        while(price > 999) {
            price = price / 1000;
            i = i + 1;
        }
        const res = price + ',000';
        
        return res;
        
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
                const confirms = window.confirm('관심상품에 등록되었습니다. 관심상품 페이지로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href='/wish';
                    return;
                }
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

    const addbuy = () => {
        const confirm = window.confirm('상품을 구매하시겠습니까?');

        if(confirm) {
            let array = [];
            const response = array.concat(product); //map함수를 사용하므로 배열형식으로 추가.
            window.localStorage.setItem('pay',JSON.stringify(response));
            window.localStorage.setItem('paytotal',JSON.stringify(product.price));
            window.location.href='/payment';
        }
    }

  
    

    const find = () => {
        console.log('실행?');
        console.log("왜 안해");
        console.log(Goods);
        for(let i in Goods) {
            if(Goods[i].name === name) {
                console.log(name);
                setProduct(Goods[i]);
                window.localStorage.setItem("product",JSON.stringify(Goods[i]));
                break;
            }
        }
    }
    
   

    //console.log(product);

    
    return (
        <>
        <div className={styles.body} ref={scrollref}>
            <Nav user={user} />
            <div className={styles.sort}>
            <Category />
            <Transition in={toggle} timeout={500} appear>
                { (state =>  (
                    <div style={ {...defaultStyle, ...transitionStyles[state]}}>
                     <div className={styles.container}>
                     <div className={styles.fonts}>
                         <p>{product !== null ? product.name : null}</p>
                         <p>{product !== null ? comma(product.price) : null}원</p>
                         <p>3,000원 (50,000원 이상 구매 시 무료)</p>
                         <br/>
                         <p>PRODUCT INFO &gt;</p>
                         <p>SHIPPING INFO &gt;</p>
                         <p>SIZEGUIDE INFO &gt;</p>
                         <br/>
                         <h5>TOTAL &nbsp;:&nbsp; {product !== null ? comma(product.price) : null}원</h5>
                         <div className={styles.button}>
                             <button onClick={addbuy}>BUY NOW</button>
                             <button onClick={additem}>ADD CART</button>
                             <button onClick={addwish}>WISH LIST</button>
                             <button id='kakaotalk-sharing-btn' onClick={addShare}>
                             <img
    src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
    alt="카카오톡 공유 보내기 버튼" width='35px' height='35px'
  />
                             </button>
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
            <Reviews />
            <Footer />
        </div>
        </>
    )
}

export default React.memo(Product);