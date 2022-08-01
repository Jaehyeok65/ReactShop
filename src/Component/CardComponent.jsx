import React from 'react';
import styles from './Carusel.module.css';


const CardComponent = ({ url , price }) => {


    return (
        <>
        <div className={styles.card}>
            <div className={styles.cardtop}>
                <img src={url} alt={price} />
                <h1>{price}</h1>
            </div>
        </div>
        </>
    )
}


export default CardComponent;