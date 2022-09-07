import { useCallback } from "react";






export const OnTest = (ship , nameInput , postcodeInput, addressInput, firstphoneInput, secondphoneInput, thirdphoneInput,
    firstemailInput, secondemailInput) => {
  
        const onTest = useCallback(() => {
            if(ship.name === '') {
                alert('수령자 이름을 입력해주세요.');
                nameInput.current.focus();
                return false;
            }
            else if(ship.postcode === '') {
                alert('우편번호를 입력해주세요.');
                postcodeInput.current.focus();
                return false;
            }
            else if(ship.address === '') {
                alert('상세주소를 입력해주세요.');
                addressInput.current.focus();
                return false;
            }
            else if(ship.phone.first === '' || ship.phone.second === '' || ship.phone.third === '') {
                alert('전화번호를 입력해주세요.');
                if(ship.phone.first === '') {
                    firstphoneInput.current.focus();
                }
                else if(ship.phone.second === '') {
                    secondphoneInput.current.focus();
                }
                else if(ship.phone.third === '') {
                    thirdphoneInput.current.focus();
                }
                return false;
            }
            else if(ship.email.first === '' || ship.email.second === '') {
                alert('이메일을 입력해주세요.');
                if(ship.email.first === '') {
                    firstemailInput.current.focus();
                }
                else if(ship.email.second === '') {
                    secondemailInput.current.focus();
                }
                return false;
            }
            return true;
        },[ship,nameInput,postcodeInput,addressInput,firstphoneInput,secondphoneInput,thirdphoneInput,firstemailInput,secondemailInput])

        return onTest;
}