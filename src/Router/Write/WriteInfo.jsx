import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Component/Write.module.css';



const WriteInfo = ( { states }) => {



    return(
        <>
         <div className={styles.flexcontainer1}>
            <img src={states.data.url} alt={states.data.name} className={styles.img1}/>
            <div className={styles.flexcontainer2}>
                <p>{states.data.name}</p>
                <p>{states.data.price}</p>
                <p><button><Link to={`/product/${states.data.name}`} className={styles.textlink}>상품상세보기</Link></button><button>상품정보선택</button></p>
            </div>
        </div>
        </>
    )
}

export default React.memo(WriteInfo);