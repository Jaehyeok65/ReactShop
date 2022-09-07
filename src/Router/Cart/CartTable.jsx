import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from '../../Component/Cart.module.css'
import { OnQuantityDown } from '../../Module/OnQuantityDown';
import { OnQuantityUp } from '../../Module/OnQuantityUp';
import { OnCheckChange } from './OnCheckChange';




const CartTable = ( { item, setState, setTotal }) => {


    const onCheckChange = OnCheckChange(item,setState); //상품의 체크 상태를 변경시킴

    const onQuantityup = OnQuantityUp(item,setState,setTotal); //상품 수량을 증가시킴

    const onQuantitydown = OnQuantityDown(item,setState,setTotal); //상품 수량을 감소시킴


    return(
        <>
        { item !== null ?  item.map( (data, index) => (
                            <tr key={index}>
                                <td>{<input type='checkbox' name='check' value={data.check} onChange={() => onCheckChange(data)} />}</td>
                                <td className={styles.imgs}><Link to={`product/${data.name}`}>{<img src={data.url} alt = {data.name} width='110px' height='120px' />}</Link></td>
                                <td><Link to={`product/${data.name}`} className={styles.textlink}>{data.name}</Link></td>
                                <td>{data.price}원</td>
                                <td><div className={styles.quantity}><span>{data.quantity}</span>
                                <div className={styles.arrowbutton}>
                                    <button className={styles.arrow} onClick={() => onQuantityup(data)}><FaArrowUp /></button>
                                    <button className={styles.arrow} onClick={() => onQuantitydown(data)}><FaArrowDown /></button>
                                    </div>
                                </div>
                                </td>
                                <td>{0}</td>
                                <td>{0}</td>
                                <td>{data.price * data.quantity}원</td>
                            </tr>
                        )) : null }
        </>
    )
}


export default React.memo(CartTable);