import { dbService } from "../mybase";



export const getList = async() => {  //db에서 shop 아이템을 가져옴
    const item = await dbService.collection('shopping').get();

    let array = [];
    item.forEach( doc => {
        //console.log(doc.data());
      array.push(doc.data());
    })

    //console.log(array);

    return array;
  };





  




