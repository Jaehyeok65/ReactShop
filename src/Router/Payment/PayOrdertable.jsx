import React from 'react';
import styles from '../../Component/Cart.module.css'



const PayOrdertable = ( { paytotal } ) => {


    return(
        <>
        <table border='1' className={styles.paytable}>
                    <tr>
                        <th colSpan={2}>총 주문 금액</th>
                        <th colSpan={2}>총 할인 + 부가 결제 금액</th>
                        <th colSpan={1}>총 결제 금액</th>
                    </tr>
                    <tr>
                        <td style={{fontWeight : 'bold', fontSize : '16px'}} colSpan={2}>{paytotal}원</td>
                        <td style={{fontWeight : 'bold', fontSize : '16PX'}} colSpan={2}>0원</td>
                        <td style={{fontWeight : 'bold' , fontSize : '16px'}} colSpan={1}>= {paytotal}원</td>
                    </tr>
        </table>
        <table border='1' className={styles.paytable2}>
                    <tr>
                        <td>총 할인 금액</td>
                        <td colSpan={2}>0원</td>
                    </tr>
                    <tr>
                        <td>총 부가 결제 금액</td>
                        <td>0원</td>
                    </tr>
        </table>
        </>

    )



}


export default React.memo(PayOrdertable)