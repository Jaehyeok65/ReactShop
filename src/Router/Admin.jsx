import React from 'react';
import { useState, useRef } from 'react';
import { dbService, storageService } from '../mybase';
import { v4 as uuidv4 } from 'uuid';



const Admin = ( { input, setinput }) => {

    const [attachment, setAttachment] = useState('');



    const onChange = (e) => {
        const { name, value } = e.target;
        setinput( {
            ...input,
            [name] : value
        });
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        //console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setAttachment(e.currentTarget.result);
        }



    }

    const onSubmit = async(e) => {
        e.preventDefault();
        let attachmenturl = '';
        if(attachment !== '') {
        const fileRef =  storageService.ref().child(`admin/${uuidv4()}`); //이미지 아이디 랜덤 부여
        const response = await fileRef.putString(attachment, 'data_url');
        attachmenturl = await response.ref.getDownloadURL();
        }
        const shop = {
            ...input,
            url : attachmenturl
        }
        dbService.collection('shopping').add(shop);
        setinput({
            name : '',  //상품 이름 
            userId : '',
            price : '',
            url : '',
        });
        setAttachment("");
    }

    

    return (
        <>
        <div>
            <form onSubmit={onSubmit}>
                <p>제품 이름 : <input type='text' name='name' value={input.name} onChange={onChange}/></p>
                <p>제품 가격 : <input type='text' name='price' value={input.price} onChange={onChange} /></p>
                <p>제품 이미지 : <input type='file' accept='image/*' name='url' onChange={onFileChange}/></p>
                <input type='submit' value='등록' />
            </form>
            <img src={attachment} alt='이미지' />
        </div>
        </>
    )

}



export default Admin;