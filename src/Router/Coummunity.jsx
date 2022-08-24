import React, { useState, useEffect, useRef } from 'react';
import styles from '../Component/Coummunity.module.css';
import { useParams } from 'react-router-dom';
import { dbService } from '../mybase';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
import Category from '../Component/Category';
import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Pagination from '../Component/Pagegination';

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


const Coummunity = () => {

    const scrollref = useRef();

    const [ review, setReview ] = useState([]);
    const [toggle, setToggle] = useState(false);

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;



    

    useEffect(() => {
        getReview();
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [])

    const getReview = async() => {
        setReview([]); // 데이터 중복 초기화를 위해 비움
        const data = await dbService.collection('review').get();
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

    


    

    

    
    


    return (
            <div ref={scrollref}>
                <Nav />
                <div className={styles.sort}>
                    <Category />
                    <div className={styles.container}>
                    <Transition in={toggle} timeout={500}>
                        {(state) => (
                            <div style={{...defaultStyle,...transitionStyles[state]}}>
                                <div>
                        <p>REVIEW</p>
                        <p>상품 사용 후기입니다.</p>
                        <table border='1px solid gray' className={styles.ordertable}>
                            <tr>
                                <th>NO</th>
                                <th>IMG</th>
                                <th>PRODUCT</th>
                                <th>SUBJECT</th>
                                <th>NAME</th>
                                <th>DATE</th>
                                <th>POINT</th>
                            </tr>
                            { review !== null && review.length !== 0 ? 
                                 review.slice(offset, offset + limit).map((items, index) => (
                                        <tr>
                                            <td key = {index}>{index + offset + 1}</td>
                                            <td><Link to={`/product/${items.productname}`}><img src={items.url} alt={items.productname} width='70px' height='80px'/></Link></td>
                                            <td>{items.productname}</td>
                                            <td>{items.subject}</td>
                                            <td>{items.name}</td>
                                            <td>{items.date}</td>
                                            <td>{null}</td>
                                        </tr>
                                    ))
                             :  <tr>
                                <td colSpan={7} style={{color : 'gray'}}>아직 상품 리뷰가 없습니다.</td>
                                </tr>}
                        </table>
                        <div className={styles.pagenation}>
                 <Pagination total={review.length} limit={limit} page={page} setPage={setPage} />
                     </div>
                        </div>
                            </div>
                        )}
                    </Transition>
                    </div>
                </div>
                <Footer />
            
            </div>
    )
}


export default Coummunity;