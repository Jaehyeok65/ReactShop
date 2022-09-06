import { useCallback } from "react";
import { OnCheck } from "../../Module/OnCheck";
import { Price } from "../../Module/Price";


export const WishAddItem = ( wish ) => {

    console.log(wish);

    const additem = useCallback(() => {   //장바구니에 아이템을 추가함

        const checks = OnCheck(wish);
        

        if(checks) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        const confirm = window.confirm('해당 상품을 장바구니에 추가하시겠습니까?');

        if(confirm) {
        let array = []; //concat을 위해 빈 배열 선언
        const res = JSON.parse(window.localStorage.getItem('cart')); //장바구니에 동일한 상품이 있는지 확인
        const resarray = array.concat(res); //find함수를 사용하기 위해 concat을 이용해 배열로 만듬
        let response = []; //장바구니에 중복되지 않는 상품을 담는 배열
        let checked = []; //체크된 배열을 담는 배열
        let response2 = [] //장바구니에 중복되는 상품을 담는 배열
        if(res !== null) {  //장바구니에 상품이 있을 경우 
            checked = wish.filter( item => item.check === true);
            for(let i in checked) {
                for(let j in resarray) {
                    if(checked[i].name === resarray[j].name) {
                        response2.push(checked[i]);
                    }
                }
            }
            for(let i in checked) {
                if(response2.find(item => item.name === checked[i].name) === undefined) { //중복되는 상품 배열
                    response.push(checked[i]);
                }
            }

            response = response.concat(resarray);
        }
        else if(res === null) {
            response = wish.filter( item => item.check === true); //장바구니에 상품이 없을 경우 wishlist에 체크된 상품만 장바구니에 추가
        }
        const total = Price(response);
        
        const responses = response.map(item => ( {
            ...item,
            check : false
        } //장바구니에 선택된 상태로 저장하면 안되므로 모든 check를 false로 초기화 
        ));

        

        window.localStorage.setItem('cart',JSON.stringify(responses)); //새로운 response를 cart 장바구니에 저장.
        window.localStorage.setItem('total',JSON.stringify(total));

        const confirms = window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?');

        if(confirms) {
            window.location.href='/cart';
        }
    }
       

    }, [wish]);

    return additem;
}