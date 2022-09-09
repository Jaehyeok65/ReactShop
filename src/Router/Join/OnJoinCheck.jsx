import { useCallback } from "react";





export const OnJoinCheck = (joininput, setJoininput) => {

    const joincheck = useCallback(() => {

        const res = {...joininput};
        setJoininput({
          first : !res.first,
          second : !res.second,
          third : !res.third,
          four : !res.four
        })
      },[joininput, setJoininput])

      return joincheck;

}