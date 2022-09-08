import { v4 as uuidv4 } from 'uuid';
import { Formatting } from '../../Module/Formatting';
import { dbService } from '../../mybase';
import { useCallback } from 'react';




 export const OnSubmit = (ship , paytotal, pay, user) => {

    const onSubmit = useCallback(async() => {

        const today = Formatting(new Date());

        const res = { //데이터베이스에 전달될 데이터 구조 갱신
            name : ship.name,
            address : ship.postcode + ' '+ ship.address,
            phone : `${ship.phone.first}-${ship.phone.second}-${ship.phone.third}`,
            email : `${ship.email.first}@${ship.email.second}`,
            totalprice : paytotal,  
            date : today  
        }

        const orderid = uuidv4(); //한 번의 주문에는 주문번호가 같아야하기 때문에 미리 주문번호 할당

        const pays = pay.map(item => { //각각의 아이템에 주문번호와 주문 일자 데이터를 추가함.
            const items = {...item, date : today, orderid : orderid, shipstate : '배송전', canclestate : '불가'}
            return items;
        })

        
        const response = { ...res,
        item : pays,
        uid : user.uid,
        useremail : user.email,
        orderid : orderid
        };
        const data = await dbService.collection('shipping').add(response);

        if(data) {
            alert('결제가 완료되었습니다.');
            window.location.href='/';
        }

        
    },[ship, paytotal, pay, user]);

    return onSubmit;

    
}