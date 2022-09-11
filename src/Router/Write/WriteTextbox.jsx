import React from 'react';
import { useChange } from "../../Module/useChange"
import styles from '../../Component/Write.module.css';





const WriteTextbox = ( { input, setInput }) => {

    const onChange = useChange(input, setInput);


    return (
        <>
        <div className={styles.gridcontainer1}>
            <span>제목</span>
            <input type='text' name = 'subject' value={input.subject} onChange={onChange} className={styles.inputs} />
        </div>
        <textarea value={input.content} name='content' onChange={onChange} className={styles.textareas}/>
        </>
    )
}


export default React.memo(WriteTextbox);
