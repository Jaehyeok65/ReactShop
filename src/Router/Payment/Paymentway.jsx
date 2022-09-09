import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../Component/Cart.module.css'
import { Comma } from '../Product/Comma';





const Paymentway = ( { paytotal, onTest, onSubmit }) => {

    const [payway,setPayway] = useState({
        list : ['카카오페이','토스'],
        selected : '카카오페이'
    }); //기본값은 카카오페이

    useEffect( () => {  //제이쿼리, iamport 삽입
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    },[])


    const onClickPayment = () => {
        const res = onTest();
        if(res === false) {
            return;
        }
        
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init('imp16208326');
        let response = 'kakaopay';
        if(payway.selected === '토스') {
            response = 'tosspay'
        }
    
        /* 2. 결제 데이터 정의하기 */
        const data = {
          pg: response,                           // PG사
          pay_method: 'card',                           // 결제수단
          merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
          amount: paytotal,                                 // 결제금액
          name: '아임포트 결제 데이터 분석',                  // 주문명
          buyer_name: '팔협지',                           // 구매자 이름
          buyer_tel: '01012341234',                     // 구매자 전화번호
          buyer_email: 'example@example',               // 구매자 이메일
          buyer_addr: '신사동 661-16',                    // 구매자 주소
          buyer_postcode: '06018',                      // 구매자 우편번호
        };
    
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
      }

      const callback = (response) => {
        const {
          success,
          merchant_uid,
          error_msg,
        } = response;

        if (success) {
            alert('결제 성공');
            onSubmit();
          } else {
            alert(`결제 실패: ${error_msg}`);
          }
    }

    const onChange = (e) => {
        const { name , value } = e.target;
        const response = { ...payway,
            [name] : value
        }
        setPayway(()=>response);
    }


    return (
        <div>
            <h4 style={{fontSize : '12px', marginTop : '7%'}}>결제수단</h4>
            <hr />
            <div className={styles.payway}>
            { payway.list.map( (item, index) => (
                <div key = {index} style={{margin : '8px'}}>
                <input type='radio' name='selected' value={item} id={item} checked={payway.selected === item} onChange={onChange} /><label htmlFor={item} style={{fontSize : '14px', fontWeight : 'bold'}}>{item}</label>
                </div>
            ))}
            </div>
            <hr/>
            <div className={styles.paywaygrid}>
                <div>
                    <span>{payway.selected} 최종 결제 금액</span>
                    <h2>{Comma(paytotal)}원</h2>
                </div>
                <div>
                    <p>상품별 적립금 <span>0원</span></p>
                    <p>회원 적립금 <span>0원</span></p>
                    <p>쿠폰 적립금 <span>0원</span></p>
                    <p>총 적립 예정 금액 <span>0원</span></p>
                </div>
            </div>
            <button className={styles.paywaybtn} onClick={onClickPayment}>ORDER</button>
            

            
        </div>
    )
}


export default React.memo(Paymentway);