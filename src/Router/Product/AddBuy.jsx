import { useCallback } from "react";



export const AddBuy = (states) => {

    console.log(states);

    const addbuy = useCallback(() => {
        const confirm = window.confirm('상품을 구매하시겠습니까?');

        if(confirm) {
            let array = [];
            const response = array.concat(states.data); //map함수를 사용하므로 배열형식으로 추가.
            window.localStorage.setItem('payment',JSON.stringify(response));
            window.localStorage.setItem('paytotal',JSON.stringify(states.data.price));
            window.location.href='/payment';
        }
    },[states])

    return addbuy;


}