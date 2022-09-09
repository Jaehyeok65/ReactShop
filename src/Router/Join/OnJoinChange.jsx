import { useCallback } from "react";





export const OnJoinChange = (input, setInput) => {


    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        if(name === 'first' || name === 'second' || name === 'third') {
          const res = {
            ...input,
            phone : {
              ...input.phone,
              [name] : value
            }
          }
          setInput(res);
        }
        else {
        setInput({
            ...input,
            [name] : value
        })
      }
    },[input, setInput])

    return onChange;
}