import { useCallback } from "react";




export const OnJoinTest = (input, joininput, emailInput, passwordInput, confirmInput, nameInput,
    firstphoneInput, secondphoneInput, thirdphoneInput) => {
       
    const onTest = useCallback(() => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8}$/;
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const phoneRegex = /^01(?:0|1|[6-9])(?:\d{4}|\d{4})\d{4}$/;
        if(joininput.first === false || joininput.second === false) {
          alert('회원가입 약관에 동의해주세요.');
          return false;
        }
  
        else if(input.email === '') {
            alert('이메일을 입력해주세요.');
            emailInput.current.focus();
            return false;
        }
        else if(input.password === '') {
            alert('비밀번호를 입력해주세요.');
            passwordInput.current.focus();
            return false;
        }
        else if(input.confirm === '') {
            alert('비밀번호 확인란을 입력해주세요.');
            confirmInput.current.focus();
            return false;
        }
  
        else if(input.displayname === '') {
          alert('이름을 입력해주세요.');
          nameInput.current.focus();
          return false;
          
         }
  
        else if(input.phone.first === '' || input.phone.second === '' || input.phone.third === '') {
            alert('전화번호를 입력해주세요.');
            if(input.phone.first === '') {
                firstphoneInput.current.focus();
            }
            else if(input.phone.second === '') {
                secondphoneInput.current.focus();
            }
            else if(input.phone.third === '') {
                thirdphoneInput.current.focus();
            }
            return false;
        }
  
        else if(input.password !== input.confirm) {
          alert('비밀번호를 확인해주세요.');
          passwordInput.current.focus();
          return false;
        }
        else if(!emailRegex.test(input.email)){
            alert('이메일 입력 양식을 확인해주세요.');
            emailInput.current.focus();
            return false;

        }
        else if(!passwordRegex.test(input.password)) {
            alert("비밀번호는 8자 이상 문자와 숫자를 혼합해야합니다.");
            passwordInput.current.focus();
            return false;
        }
        else if(!phoneRegex.text(input.phone.first+input.phone.second+input.phone.third)){
            alert("휴대폰 번호 입력 양식을 확인해주세요.")
            secondphoneInput.current.focus();
            return false;
        }
  
        return true;
    },[input,firstphoneInput,secondphoneInput,thirdphoneInput,nameInput,passwordInput,emailInput,confirmInput,joininput]);

    return onTest;

}