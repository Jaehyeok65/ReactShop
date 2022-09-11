import { dbService } from "../../mybase";
import { useCallback } from "react";



export const GetUpdate = (update, setInput) => {

    const getUpdate = useCallback(async() => {
        if(update !== 'false') {
            const data = await dbService.collection('review').doc(update);
            data.get().then( item => {
                setInput(item.data());
            })
        }
    },[update, setInput]);

    return getUpdate;
}