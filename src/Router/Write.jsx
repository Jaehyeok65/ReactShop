import React, { useState, useEffect, useRef } from 'react';
import Category from '../Component/Category';
import Nav from '../Component/Nav';
import styles from '../Component/Write.module.css';
import { useParams } from 'react-router-dom';
import { dbService } from '../mybase';
import Footer from '../Component/Footer';
import { v4 as uuidv4 } from 'uuid';
import { Transition } from 'react-transition-group';

const duration = 1000;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 , transform : 'translate3d(0, 4%, 0)'},
  entered:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exiting:  { opacity: 1 , transform: 'translate3d(0, 0,0)'},
  exited:  { opacity: 0 },
};


const Write = ( { Goods }) => {

    const { update } = useParams();
    const scrollref = useRef();



    const [ product, setProduct ] = useState(
        () => JSON.parse(window.localStorage.getItem('product')) || null
    );

    const [ toggle, setToggle ] = useState(false);


    const [ input, setInput ] = useState({
        subject : '',
        content : '',
        productname : product.name,
        name : JSON.parse(window.sessionStorage.getItem('user')) !== null ? JSON.parse(window.sessionStorage.getItem('user')).displayName : '',
        date : '',
        toggle : false
    });


    useEffect(() => {
        getUpdate();
        setToggle(prev => !prev);
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, []);
    

    const onChange = (e) => {
        const { name, value } = e.target;
        
        setInput ( {
            ...input,
            [name] : value
        })

    }

    console.log(input);

    const getUpdate = async() => {
        if(update !== 'write') {
            const data = await dbService.collection('review').doc(update);
            data.get().then( item => {
                setInput(item.data());
            })
        }
    }

    const Formatting = (source, delimiter = '-') => {
        const year = source.getFullYear();
        let month = (source.getMonth() + 1);
        if(parseInt(month) < 10 && parseInt(month) > 0) {
            month = '0' + month;
        }
        const day = (source.getDate());
    
        return [year, month, day].join(delimiter);
    }


    const onSubmit = async() => {

        if(input.content === '' || input.subject === '') {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        const today = Formatting(new Date());
        const res = { ...input,
        date : today,
        id : uuidv4()
        }


        if( update === 'write') { //새로운 write일 경우

        await dbService.collection('review').add(res);
        window.history.back();

        }
        else {
            await dbService.collection('review').doc(update).update({
                subject : input.subject,
                content : input.content
            });
            window.history.back();
            
        }
    }

    const onCancle = () => {
        window.history.back();
    }


    

    





    return (
        <div ref={scrollref}>
            <Nav />
            <div className={styles.sort}>
                <Category />
                <div className={styles.container}>
                <Transition in={toggle} timeout={500} appear> 
                { (state => (
                    <div style={ {...defaultStyle, ...transitionStyles[state]}}>
                <div className={styles.write}>
                    <p className={styles.p1}>REVIEW</p>
                    <p className={styles.p2}>상품 사용후기입니다.</p>
                    <div className={styles.back}>
                        <div className={styles.flexcontainer1}>
                            <img src={product.url} alt={product.name} className={styles.img1}/>
                            <div className={styles.flexcontainer2}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p><button>상품상세보기</button><button>상품정보선택</button></p>
                            </div>
                        </div>
                        <div className={styles.flexcontainer3}>
                        <hr/>
                        <div className={styles.gridcontainer1}>
                            <span>제목</span>
                            <input type='text' name = 'subject' value={input.subject} onChange={onChange} className={styles.inputs} />
                        </div>
                        <textarea value={input.content} name='content' onChange={onChange} className={styles.textareas}/>
                        <div className={styles.flexcontainer4}>
                            <div>
                            <button className={styles.button2}>목록으로</button>
                            </div>
                            <div>
                                <button className={styles.button2} onClick={onSubmit}>등록</button>
                                <button style={{ marginLeft : '4px', marginBottom : '100px'}} onClick={onCancle}>취소</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                ))}
                </Transition>
                </div>
            </div>
            <Footer />
        </div>
    )


}



export default React.memo(Write);