import React, { useState, useEffect, useRef  } from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';
import { dbService } from '../mybase';
import './ShopList.css';



const ListCard = ({ url , price, name, page }) => { //문제점 : 새로고침을 하면서 이미지가 로드되기전에 card가 보이기때문에 가시성이 true가 됨



    const [renum, setRenum] = useState();


    const getRenum = async() => {
        const data = await dbService.collection('review').where('productname','==',name).get();
        //console.log('데이터 확인');
        setRenum(() => data.size);
    }


    useEffect( () => {
        getRenum();
    },[page])

   



    

    

    const comma = (price) => {
        let i = 0;
        while(price > 999) {
            price = price / 1000;
            i = i + 1;
        }
        const res = price + ',000';
        
        return res;
    }

    

    

    


    


    return (
        <>
        <Link to={`/product/${name}`} className={styles.textlink}>
        <div className={styles.card} >
            
             <div className={styles.cardtop}>
             <img src={url} alt={price} />
                <p>{name}</p>
                <p>{comma(price)}원</p>
                <p>사용후기 : {renum && renum}</p>
             </div>
        </div>
        </Link>
        </>

    )
}


export default React.memo(ListCard);