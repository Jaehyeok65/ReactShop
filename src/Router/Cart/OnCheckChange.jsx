import { useCallback } from "react";





export const OnCheckChange = (item, setState) => {

    const oncheckChange = useCallback((e) => {

        const array = [...item];
        for(let i in array) {
            if(array[i].name === e.name) {
                array[i].check = !array[i].check;
            }
        }
        setState(array);
    },[item, setState])

    return oncheckChange;
}