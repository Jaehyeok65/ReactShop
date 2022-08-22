import React, { useState, useEffect, useRef } from 'react';
import styles from './Review.module.css';
import { useParams } from 'react-router-dom';
import { dbService } from '../mybase';
import  Pagination  from './Pagegination';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';


const Reviews = () => {

    const { name } = useParams();

    const [ review, setReview ] = useState([]);

    const [ write, setWrite ] = useState({
        subject : '',
        content : '',
        productname : name,
        name : JSON.parse(window.sessionStorage.getItem('user')) !== null ? JSON.parse(window.sessionStorage.getItem('user')).displayName : '',
        date : '',
        toggle : false
    });


    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;



    useEffect(() => {
        getReview();
    }, [])

    const getReview = async() => {
        setReview([]); // 데이터 중복 초기화를 위해 비움
        const data = await dbService.collection('review').where('productname','==',name).get();
        data.forEach( item => {
            const res = {
                ...item.data(),
                reviewid : item.id
            }
            setReview( prev => [...prev, res]);
        })
    }



    const Formatting = (source, delimiter = '-') => {
        const year = source.getFullYear();
        let month = (source.getMonth() + 1);
        if(parseInt(month) < 10 && parseInt(month) > 0) {
            month = '0' + month;
        }
        const day = (source.getDate());
    
        return [year, month, day].join(delimiter);
    }

    const onLogin = () => {
        alert('로그인이 필요합니다.');
        window.location.href='/login';
    }




    const onToggle = (item) => {
        let res = !item.toggle;


        const temp = {...item,
          toggle : res
        }


        const response = review.map(rev => (
            rev.id === item.id ? temp : rev 
        ))

        setReview(() => response);
    }


    const onDelete = async(item) => {
        const ok = window.confirm('댓글을 삭제하시겠습니까?');

        if(ok) {
            await dbService.collection('review').doc(item).delete();
            getReview();
        }
    }

   

    

    
    


    return (
    <div className={styles.container}>
    <div className={styles.review}>
        <p>REVIEW</p>
        <div className={styles.buttons}>
            {write.name === '' ? <button onClick={onLogin}>WRITE</button> : <button><Link to={`/write/write`} className={styles.textlink}>WRITE</Link></button>}
            <button>LIST</button>
        </div>
    </div>
    <hr/>
    <div className={styles.reviewcontainer}>
        <span>NO</span>
        <span>SUBJECT</span>
        <span>NAME</span>
        <span>DATE</span>
        <span>COMMIT</span>
    </div>
    <hr/>
              { review.length !== 0 ? review.slice(offset, offset + limit).map((item, index) => (
                <div key={index}>
                <div className={styles.reviewcontainer}>
                    <span>{index + offset + 1}</span>
                    <span onClick={() => onToggle(item)}>{item.subject}</span>
                    <span>{item.name}</span>
                    <span>{item.date}</span>
                    { item.name === write.name ? <span><button className={styles.reviewbutton}><Link to={`/write/${item.reviewid}`} className={styles.textlink}>수정</Link></button><button className={styles.reviewbutton} onClick={() => onDelete(item.reviewid)}>삭제</button></span> : null}
                </div>
                { item.toggle ? 
                <div className={styles.contents}>{item.content}</div>
                 : null}
                 <hr/>
                </div>
            )) : <div><span className={styles.spans1}>아직 댓글이 없습니다.</span></div>}
            <div className={styles.pagenation}>
                 <Pagination total={review.length} limit={limit} page={page} setPage={setPage} />
            </div>
    </div>
    )
}


export default React.memo(Reviews);