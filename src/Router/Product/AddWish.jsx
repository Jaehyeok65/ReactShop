import { useCallback } from "react";



export const AddWish = (states, userCheck) => {


    const addwish = useCallback(() => {   //장바구니에 아이템을 추가함

       if(userCheck()) {
            return;
        }
        
        let array = [];

        const res = JSON.parse(window.localStorage.getItem('wish')); //장바구니에 동일한 상품이 있는지 확인
        const resarray = array.concat(res); //find함수를 사용하기 위해 concat을 이용해 배열로 만듬
        let response = null;
        if(res !== null) { //res가 null이라면 find함수가 작동하지 않으므로 null이 아닌 경우에만 find함수를 사용
        response = resarray.find( item => { //장바구니 내역에서 현재 상품과 이름이 같은 아이템을 찾음
            return item.name === states.data.name
        })}
        if(response !== undefined && response !== null) { //undefined가 아니고 초기값 null이 아니라면 장바구니에 동일한 상품이 있는 것
            const confirm = window.confirm('관심상품에 동일한 상품이 있습니다. 상품을 추가하시겠습니까?');
            if(confirm) {
                const confirms = window.confirm('관심상품에 등록되었습니다. 관심상품 페이지로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href='/wish';
                    return;
                }
                return ; //이미 장바구니에 저장이 되어있으므로 return
            }
            return;
        }
        else {  //undefined이거나 초기값 null이라면 장바구니에 동일한 상품이 없는 것

        const confirm = window.confirm('상품을 관심상품에 추가하시겠습니까?');
        if(confirm) {
            const res = JSON.parse(window.localStorage.getItem('wish')); //기존에 장바구니에 있던 상품을 가져옴
            //console.log(res);
            if(res !== null) { //기존에 장바구니에 상품이 있다면
            const wisharray = array.concat(res); //배열을 만들어서 기존에 장바구니에 있던 상품에 현재 상품을 추가
            const wisharrays = [...wisharray, states.data];
            window.localStorage.setItem('wish',JSON.stringify(wisharrays)); //새로 만든 배열을 장바구니에 추가
            const confirms = window.confirm('관심상품에 추가되었습니다. 관심상품으로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/wish";
                }
            }
            else {  //기존에 장바구니에 상품이 없다면
                const wisharrays = array.concat(states.data); //map함수를 사용해야하므로 배열형태로 장바구니에 추가
                window.localStorage.setItem('wish',JSON.stringify(wisharrays)); //현재 상품만 장바구니에 추가
                const confirms = window.confirm('관심상품에 추가되었습니다. 관심상품으로 이동하시겠습니까?');
                if(confirms) {
                    window.location.href = "/wish";
                }
            }
        }
    }
    },[states, userCheck]);

    return addwish;
}