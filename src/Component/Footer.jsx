import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import styles from './Footer.module.css';


const Footer = () => {


    return (
        <>
        <hr className={styles.hr1} />
        <div className={styles.flexcontainer1}>
            <div className={styles.flexitem1}>
                <span className={styles.insta1}><FaInstagram /><span className={styles.font1}>INSTAGRAM</span></span>
                <span className={styles.kakao1}><FaLine /><span className={styles.font2}>KAKAOTALK</span></span>
            </div>
            <div className={styles.flexitem2}>
                <span>PRIVACY POLICY</span>
                <span>GUIDE</span>
                <span>AGREEMENT</span>
                <span>MY PAGE</span>
                <span>SIGN IN</span>
            </div>
        </div>
        <div className={styles.flexcontainer2}>
            <ul>
                <li>COMPANY: 제이티디코퍼레이션  &nbsp; OWNER : Hyeok Jae Lee &nbsp; Copyright ©제이티디코퍼레이션 All rights reserved.™ </li>
                <li>OFFICE: 010-6220-6662 &nbsp; BUSINESS NUMBER:566-23-01037 &nbsp; MAIL-ORDER LICENSE:제 2020-서울강서-0435호 </li>
                <li>ADDRESS:  107-902, 118 Yangcheon-ro 47-gil, Gangseo-gu, Seoul</li>
            </ul>
        </div>

        </>
    )
}


export default Footer;