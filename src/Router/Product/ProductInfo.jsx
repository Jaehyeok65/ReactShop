import React from 'react';
import { Comma } from './Comma';
import ProductUi from './ProductUi';
import styles from '../../Component/Home.module.css'






const ProductInfo = ( { states, user }) => {


    return(
        <>
         <div className={styles.container}>
                  <div className={styles.fonts}>
                      <p>{states.data && states.data.name}</p>
                      <p>{states.data && Comma(states.data.price)}원</p>
                      <p>3,000원 (50,000원 이상 구매 시 무료)</p>
                      <br/>
                      <p>PRODUCT INFO &gt;</p>
                      <p>SHIPPING INFO &gt;</p>
                      <p>SIZEGUIDE INFO &gt;</p>
                      <br/>
                      <h5>TOTAL &nbsp;:&nbsp; {states.data && Comma(states.data.price)}원</h5>
                      <ProductUi states={states} user={user} />
                  </div>
                  <div className={styles.images}>
                      <img src={states.data && states.data.url} alt='이미지' />
                  </div>
              </div>
        </>
    )
}

export default React.memo(ProductInfo);