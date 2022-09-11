import { useCallback } from "react";
import { Formatting } from "../../Module/Formatting";
import { dbService } from "../../mybase";
import { v4 as uuidv4 } from 'uuid';




export const OnReviewSubmit = (input, update, states) => {

    const onSubmit = useCallback(async() => {

        if(input.content === '' || input.subject === '') {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        const today = Formatting(new Date());
        const res = { ...input,
        date : today,
        id : uuidv4(),
        productname : states.data.name,
        url : states.data.url
        }


        if( update === 'false') { //새로운 write일 경우
            await dbService.collection('review').add(res);
            //window.location.href = `/product/${states.data.name}`;
            window.history.back();
        }
        else {
            await dbService.collection('review').doc(update).update({
                subject : input.subject,
                content : input.content,
                date : today
            });
            window.history.back();
            
        }
    },[input, update, states]);

    return onSubmit;


}