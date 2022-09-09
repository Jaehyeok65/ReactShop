import { useCallback } from "react";





export const OnJoinInputChange = (joininput, setJoininput) => {


    const onJoinChange = useCallback( (e) => {
        const { name , value } = e.target;
        console.log(name, value);
        let data;
        if(value === 'false') {
          data = true
        }
        else {
          data = false
        }
        setJoininput({
          ...joininput,
          [name] : data
        })
      },[joininput, setJoininput]);

      return onJoinChange;
}