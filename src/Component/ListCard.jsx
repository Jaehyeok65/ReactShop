import React,{ useState }from 'react';
import styles from './List.module.css';


const ListCard = ({ url , price, name }) => {

    const [toggle, setToggle] = useState(true);


    


    return (
        <>
        <div className={styles.card}>
            <div className={styles.cardtop}>
                { toggle ? <img src={url} alt={price} /> : null}
                <p>{name}</p>
                <h3>{price}</h3>
            </div>
        </div>
        </>
    )
}


export default ListCard;