import { useCallback } from "react";






export const OnLoginSubmit = (authService, input) => {

    const onSubmit = useCallback(async(e) => {
        e.preventDefault();
        try {
                //로그인 성공
            const data = await authService.signInWithEmailAndPassword(input.email,input.password);
            if(data) {
              const uid = data.user.uid;
              const displayName = data.user.displayName;
              const response = {...input, uid, displayName}
              window.sessionStorage.setItem('user',JSON.stringify(response));
              window.history.back(); //이전 페이지로 리디렉션함.
              //window.location.href='/';
            }
        }
        catch(error) {
            //로그인 실패
            window.alert('아이디 또는 비밀번호가 잘못 되었습니다.');

        } 
    },[authService, input]);

    return onSubmit;
}