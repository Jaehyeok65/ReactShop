import React,{ useState }from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';


const ListCard = ({ url , price, name, id }) => {

    const [toggle, setToggle] = useState(true);


    


    return (
        <>
        <Link to={`/product/${id}`} className={styles.textlink}>
        <div className={styles.card}>
            <div className={styles.cardtop}>
                { toggle ? <img src={url} alt={price} /> : null}
                <p>{name}</p>
                <h3>{price}</h3>
            </div>
        </div>
        </Link>
        </>
    )
}


export default ListCard;