import React from 'react';
import styles from '../Component/Home.module.css'
import Nav from '../Component/Nav';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Category from '../Component/Category';
import Footer from '../Component/Footer';


const Product = ( { Goods } ) => {

    const { name }  = useParams();
    const [product, setProduct] = useState(null);
    console.log(name);

    const find = () => {
        for(let i in Goods) {
            if(Goods[i].name === name) {
                setProduct(Goods[i]);
                break;
            }
        }
    }
    
    useEffect( () => {
        find();
    },[])

    //console.log(product);

    
    return (
        <>
        <div className={styles.body}>
            <Nav />
            <div className={styles.sort}>
            <Category />
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
                        <button>ADD CART</button>
                        <button>WISH LIST</button>
                    </div>
                </div>
                <div className={styles.images}>
                    <img src={product !== null ? product.url : null} alt='이미지' />
                </div>
            </div>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Product;