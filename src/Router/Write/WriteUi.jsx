import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Component/Write.module.css';
import { OnReviewSubmit } from './OnReviewSubmit';






const WriteUi = ( { input, name, update }) => {

    const onCancle = () => {
        window.location.href=`/product/${name}`;
    }

    const onSubmit = OnReviewSubmit(input, update);



    return(
        <>
         <div className={styles.flexcontainer4}>
            <div>
                <button className={styles.button2}><Link to='/coummunity' className={styles.textlink}>목록으로</Link></button>
            </div>
            <div>
                <button className={styles.button2} onClick={onSubmit}>등록</button>
                <button style={{ marginLeft : '4px', marginBottom : '100px'}} onClick={onCancle}>취소</button>
            </div>
        </div>
        
        </>
    )
}


export default React.memo(WriteUi);