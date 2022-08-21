import React, { useState, useEffect, useRef } from 'react';
import styles from './Review.module.css';
import { useParams } from 'react-router-dom';
import { dbService } from '../mybase';


const Review = () => {

    const writeref = useRef();
    const { name } = useParams();

    const [ review, setReview ] = useState([]);

    const [ write, setWrite ] = useState({
        subject : '',
        content : '',
        productname : name,
        name : JSON.parse(window.sessionStorage.getItem('user')) !== null ? JSON.parse(window.sessionStorage.getItem('user')).displayName : '',
        date : '',
        hit : 0
    })


    const [ writemode, setWritemode ] = useState(false);

    useEffect(() => {
        getReview();
    }, [])

    const getReview = async() => {
        setReview([]); // 데이터 중복 초기화를 위해 비움
        const data = await dbService.collection('review').where('productname','==',name).get();
        data.forEach( item => {
            setReview( prev => [...prev, item.data()]);
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

    console.log(write);


    const onWritemode = () => {
        setWritemode(prev => !prev);
        writeref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        const res = { ...write,
        [name] : value
        }
        setWrite(() => res);
    }

    const onSubmit = async() => {
        if(write.name === '') { //로그인을 안했을 경우
            alert('댓글을 작성하시려면 로그인이 필요합니다.');
            setWrite({
                ...write,
                subject : '',
                content : ''
            })
            return;
        }
        const today = Formatting(new Date());
        const res = { ...write,
        date : today
        }

        const data = await dbService.collection('review').add(res);
        
        if(data) {
            getReview();
            onWritemode();
            setWrite({
                ...write,
                subject : '',
                content : '',
                
            })
        }
        
    }
    

    
    


    return (
    <div className={styles.container}>
    <div className={styles.review}>
        <p>REVIEW</p>
        <div className={styles.buttons}>
            <button onClick={onWritemode}>WRITE</button>
            <button>LIST</button>
        </div>
    </div>
    <table border='1px solid gray' className={styles.tables}>
            <tr>
                <th>NO</th>
                <th>SUBJECT</th>
                <th>NAME</th>
                <th>DATE</th>
                <th>HIT</th>
            </tr>
            { review.length !== 0 ? review.map((item, index) => (
                <tr key = {index}>
                    <td>{index + 1}</td>
                    <td><details>
                        <summary>{item.subject}</summary>
                        <br />
                        {item.content}
                        </details></td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.hit}</td>
                </tr>
            )) : <tr><td colSpan={4} style={{color : 'gray'}}>아직 댓글이 없습니다.</td></tr>}
        </table> 
        <div className={styles.write} ref={writeref}>
        { writemode ?  
            <div>
            <p>WRITE</p>
            <p><span>SUBJECT</span> <input type='text' value={write.subject} name='subject' onChange={onChange}/></p>
            <p><span className={styles.spans}>CONTENT</span><textarea name='content' value={write.content} onChange={onChange} /></p>
            <p><input type='submit' value='SUBMIT' style={{background : 'white'}} onClick={onSubmit}/></p>
        </div> : null}
         </div>
    </div>
    )
}


export default Review;