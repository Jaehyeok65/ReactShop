import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = ( { ship, setShip, postcodeInput }) => {


  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)
    const response = {
        ...ship,
        postcode : fullAddress
    }
    setShip(response);
  };

   
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' onClick={handleClick} style={{border : 'none', background : 'white', fontSize : '12px'}} ref={postcodeInput}>
      우편번호 찾기
    </button>
  );
};

export default Postcode;