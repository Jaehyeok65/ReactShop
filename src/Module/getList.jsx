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
  }


export const getShipList = async(users, date) => {

  let array = []

  console.log(users,date);

  const data = await dbService.collection('shipping').where('uid','==', users.uid).where('date','>=', date.firstDate).where('date','<=',date.secondDate).get();
        data.forEach( item => {
            array.push(item.data());
        });

      

  return array;

}


  




