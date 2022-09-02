import { dbService } from "../mybase";


 export const getProduct = async(name) => {
    let response;
    console.log("하이");
    const data = await dbService.collection('shopping').where('name', '==', name).get();
    data.forEach( doc => {
        response = doc.data();
    })

    return response;
};