import React from 'react';
import { useChange } from '../../Module/useChange';
import Postcode from './Postcode';
import styles from '../../Component/Ship.module.css';



const Shipinfo = ( { ship, setShip, nameInput, addressInput, firstphoneInput, secondphoneInput, thirdphoneInput, firstemailInput, secondemailInput ,postcodeInput }) => {

    const phoneChange = (e) => {
        const { name , value } = e.target;
        const copyphone = {
            ...ship.phone,
            [name] : value
        }
        const response = {
            ...ship,
            phone : copyphone
        }
        setShip(() => response);
    }

    const emailChange = (e) => {
        const { name , value } = e.target; //name은 first, second
        const copymail = { ...ship.email ,
            [name] : value
        }
        const response = {...ship,
            email : copymail
        }
        setShip(()=>response);
    }

    const onChange = useChange(ship, setShip);

    const onSubmit = (e) => {
        e.preventDefault();
    }



    



    return (
        <>
        <div>
            <h4>SHIPPING INFO</h4>
            <hr />
            <form onSubmit={onSubmit}>
                <p><span className={styles.names}>받으시는 분</span><input name='name' value={ship.name} placeholder='이름을 입력하세요...' onChange={onChange} ref={nameInput} autoComplete='off' /></p>
                <p><span className={styles.address}>주소</span> <input name='postcode' value={ship.postcode} placeholder='우편번호 찾기 >>>' onChange={onChange} className={styles.secondadress} disabled />
                <Postcode ship = {ship} setShip={setShip} postcodeInput={postcodeInput} /></p>
                <p><input name='address' value={ship.address} placeholder='상세 주소를 입력하세요...' onChange={onChange} className={styles.addressdetail} ref={addressInput} /></p>
                <p> <span className={styles.phone}>휴대전화</span> 
                    <select onChange={phoneChange} name='first' value={ship.phone.first} className={styles.selected} ref={firstphoneInput}>
                        <option value='010'>010</option>
                        <option value='011'>011</option>
                        <option value='016'>016</option>
                        <option value='017'>017</option>
                        <option value='018'>018</option>
                        <option value='019'>019</option>
                    </select>&nbsp;
                     - <input type='tel' name ='second' value={ship.phone.second} onChange={phoneChange} className={styles.secondphone} ref={secondphoneInput} autoComplete='off' /> - <input type='tel' name='third' value={ship.phone.third} onChange={phoneChange} className={styles.thirdphone} ref={thirdphoneInput} autoComplete='off' /> 
                </p>
                <p><span className={styles.email}>이메일</span><input type='email' name='first' value={ship.email.first} onChange={emailChange} ref={firstemailInput} />@<input type='email' name='second' className={styles.secondemail} value={ship.email.second} disabled/>
                <select name='second' onChange={emailChange} ref={secondemailInput}>
                    <option value=''>이메일을 선택하세요</option>
                    <option value='naver.com'>naver.com</option>
                    <option value='gmail.com'>gmail.com</option>
                    <option value='daum.net'>daum.net</option>
                    <option value='hotmail.com'>hotmail.com</option>
                    <option value='yahoo.com'>yahoo.com</option>
                </select>
                </p>
                <p><span className={styles.message}>배송 메시지</span><textarea className={styles.textarea} /></p>
            </form>
        </div>
        
        </>
    )
}


export default React.memo(Shipinfo);