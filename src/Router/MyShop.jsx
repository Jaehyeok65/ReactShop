import React from 'react';
import Nav from '../Component/Nav';
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import styles from '../Component/MyShop.module.css'



const MyPage = () => {


    return(
        <>
        <div className={styles.body}>
            <Nav />
            <div className={styles.sort}>
            <Category />
            <div className={styles.container}>
                <p>MYPAGE</p>
                <br/>
                <div className={styles.gridcontainer}>
                    <button>Profile 회원 정보</button>
                    <button>ORDER 주문내역 조회</button>
                    <button>WishList 관심 상품</button>
                    <button>Mileage 적립금</button>
                    <button>Coupon 쿠폰</button>
                    <button>Board 게시물 관리</button>
                </div>
                <br />
                <br />
                <p>적립금 내역</p>
                <br />
                <hr />
                <div className={styles.gridcontainer1}>
                    <p>&gt; 가용적립금 : &nbsp;<button>조회</button></p>
                    <p>&gt; 사용적립금 : &nbsp;</p>
                    <p>&gt; 쿠폰 : &nbsp;<button>조회</button> &nbsp;개</p>
                    <p>&gt; 총적립금 : &nbsp;</p>
                    <p>&gt; 총주문 : &nbsp;(회)</p>
                </div>
                <br />
                <br />
                <p>나의 주문</p>
                <br />
                <hr />
                <div className={styles.gridcontainer2}>
                    <p>&gt; 취소 : &nbsp;0&nbsp; </p>
                    <p>&gt; 교환 : &nbsp;0&nbsp; </p>
                    <p>&gt; 반품 : &nbsp;0&nbsp;</p>
                    <p>&gt; 입금전 : &nbsp;0&nbsp;</p>
                    <p>&gt; 배송준비중 : &nbsp;0&nbsp;</p>
                    <p>&gt; 배송중 : &nbsp;0&nbsp;</p>
                    <p>&gt; 배송완료 : &nbsp;0&nbsp;</p>
                </div>

            </div>
            </div>
            <br/>
            <Footer />
        </div>
        
        
        </>
    )
}


export default MyPage;