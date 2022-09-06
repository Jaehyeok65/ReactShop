import { useCallback } from "react";


export const UserCheck = (users) => {


    const userCheck = useCallback( () => {
        if(users === null) {
            alert('로그인 후 이용가능합니다.');
            window.location.href='/login';
        }
    },[users]);

    return userCheck;
}