import React,{ useState }from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';


const ListCard = ({ url , price, name, id }) => {

    const [toggle, setToggle] = useState(true);


    


    return (
        <>
        <Link to={`/product/${name}`} className={styles.textlink}>
        <div className={styles.card}>
            <div className={styles.cardtop}>
                { toggle ? <img src={url} alt={price} /> : null}
                <p>{name}</p>
                <p>{price}원</p>
            </div>
        </div>
        </Link>
        </>
    )
}


export default ListCard;