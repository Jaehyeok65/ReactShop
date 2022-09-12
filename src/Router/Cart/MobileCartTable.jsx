import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from '../../Component/Cart.module.css'
import { OnQuantityDown } from '../../Module/OnQuantityDown';
import { OnQuantityUp } from '../../Module/OnQuantityUp';
import { Comma } from '../Product/Comma';
import { OnMobileRemove } from '../../Module/OnMobileRemove';




const MobileCartTable = ( { item, setState, setTotal, name, total }) => {


    const onQuantityup = OnQuantityUp(item,setState,setTotal); //상품 수량을 증가시킴

    const onQuantitydown = OnQuantityDown(item,setState,setTotal); //상품 수량을 감소시킴

    const onMobileRemove = OnMobileRemove(item, name, total);



    return(
        <>
        { item !== null ?  item.map( (data, index) => (
                            <tr key={index}>
                                <td className={styles.imgs}><Link to={`product/${data.name}`}>{<img src={data.url} alt = {data.name} width='110px' height='120px' />}</Link></td>
                                <td className={styles.mobilecart}><Link to={`product/${data.name}`} className={styles.textlink}>{data.name}</Link>
                                {Comma(data.price)}원
                                <div className={styles.quantity}><span>{data.quantity}</span>
                                <div className={styles.arrowbutton}>
                                    <button className={styles.arrow} onClick={() => onQuantityup(data)}><FaArrowUp /></button>
                                    <button className={styles.arrow} onClick={() => onQuantitydown(data)}><FaArrowDown /></button>
                                    </div>
                                </div>
                                {Comma(data.price * data.quantity)}원
                                <button className={styles.mobileremove} onClick={() => onMobileRemove(data)}>삭제</button></td>
                            </tr>
                        )) : null }
        </>
    )
}


export default React.memo(MobileCartTable);