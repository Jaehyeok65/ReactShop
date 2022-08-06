import React,{ useState }from 'react';
import styles from './Carusel.module.css';
import { Link } from 'react-router-dom';


const CardComponent = ({ url , price, name, id }) => {

    const [toggle, setToggle] = useState(true);



    


    return (
        <>
         <Link to={`/product/${id}`} className={styles.textlink}>
        <div className={styles.imgs}>
                { toggle ? <img src={url} alt={price} /> : null}
        </div>
        </Link>
        </>
    )
}


export default CardComponent;