import { useCallback } from "react";



export const OnJoinSubmit = (authService, input, onTest) => {


    const onSubmit = useCallback(async(e) => {
        e.preventDefault();
        const test = onTest();
        if(!test) {
          return;
        }
        try {
            //계정 생성
            const data = await authService.createUserWithEmailAndPassword(input.email, input.password);
            if(data) {
              const user = data.user;
              user.updateProfile({
                displayName : input.displayname
              })
              alert('회원가입이 완료되었습니다.');
              window.location.href='/';
            }
        }
        catch(error) {
            alert(error);
        }  
    },[authService, input, onTest]);

    return onSubmit;

}

