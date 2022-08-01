import React,{ useState }from 'react';
import styles from './Carusel.module.css';


const CardComponent = ({ url , price }) => {

    const [toggle, setToggle] = useState(true);


    const onToggle = () => {
        setToggle((prev) => !prev);
    }


    return (
        <>
        <div className={styles.card}>
            <div className={styles.cardtop}>
                { toggle ? <img src={url} alt={price} /> : null}
                <h1>{price}</h1>
            </div>
        </div>
        </>
    )
}


export default CardComponent;