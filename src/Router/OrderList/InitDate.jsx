import { Formatting } from "../../Module/Formatting";
import { useCallback } from "react";


export const InitDate = (setDate) => {

    const init = useCallback( () => {
        const first = Formatting(new Date());
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 3);
        const day = today.getDate();
        const second = Formatting(new Date(year,month,day));
        setDate( {
            firstDate : first,
            secondDate : second
        });
    },[setDate]);

    return init;
}