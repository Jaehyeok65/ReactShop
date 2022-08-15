import React from 'react';
import Postcode from './Postcode';



const Shipinfo = ( { ship, setShip, nameInput, addressInput, firstphoneInput, secondphoneInput, thirdphoneInput, firstemailInput, secondemailInput ,postcodeInput }) => {


    /*const [ship, setShip] = useState({
        name : '',  //주문자 이름
        postcode : '', //우편 번호
        address : '',  //배송 주소
        phone : { first : '', second : '', third : ''}, //주문자 핸드폰
        email : { first : '', second : ''}, //주문자 이메일
        message : '' //요청사항 (필수x)
    });*/


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

    const onChange = (e) => {
        const { name , value } = e.target;
        const response = {
            ...ship,
            [name] : value
        }
        setShip(() => response);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }



    



    return (
        <>
        <div>
            <h4>SHIPPING INFO</h4>
            <hr />
            <form onSubmit={onSubmit}>
                <p><span style={{fontSize : '12px', marginRight :'55px'}}>받으시는 분</span><input name='name' value={ship.name} placeholder='이름을 입력하세요...' onChange={onChange} ref={nameInput} /></p>
                <p><span style={{fontSize : '12px', marginRight : '90px'}}>주소</span> <input name='postcode' value={ship.postcode} placeholder='우편번호 찾기 >>>' onChange={onChange} style={{ width : '200px'}} disabled />
                <Postcode ship = {ship} setShip={setShip} postcodeInput={postcodeInput} /></p>
                <p><input name='address' value={ship.address} placeholder='상세 주소를 입력하세요...' onChange={onChange} style={{marginLeft : '118px', width : '330px'}} ref={addressInput} /></p>
                <p> <span style={{fontSize : '12px', marginRight : '70px'}}>휴대전화</span> 
                    <select onChange={phoneChange} name='first' value={ship.phone.first} style={{height : '22px'}} ref={firstphoneInput}>
                        <option value='010'>010</option>
                        <option value='011'>011</option>
                        <option value='016'>016</option>
                        <option value='017'>017</option>
                        <option value='018'>018</option>
                        <option value='019'>019</option>
                    </select>&nbsp;
                     - <input type='tel' name ='second' value={ship.phone.second} onChange={phoneChange} style={{width : '80px', height : '15px'}} ref={secondphoneInput} /> - <input type='tel' name='third' value={ship.phone.third} onChange={phoneChange} style={{width : '80px' ,height :'15px'}} ref={thirdphoneInput} /> 
                </p>
                <p><span style={{fontSize : '12px', marginRight : '82px'}}>이메일</span><input type='email' name='first' value={ship.email.first} onChange={emailChange} ref={firstemailInput} />@<input type='email' name='second' value={ship.email.second} disabled/>
                <select name='second' onChange={emailChange} ref={secondemailInput}>
                    <option value=''>이메일을 선택하세요</option>
                    <option value='naver.com'>naver.com</option>
                    <option value='gmail.com'>gmail.com</option>
                    <option value='daum.net'>daum.net</option>
                    <option value='hotmail.com'>hotmail.com</option>
                    <option value='yahoo.com'>yahoo.com</option>
                </select>
                </p>
                <p><span style={{fontSize : '12px', marginRight : '55px', verticalAlign : 'top'}}>배송 메시지</span><textarea style={{width : '350px', height : '50px'}} /></p>
            </form>
        </div>
        
        </>
    )
}


export default Shipinfo;