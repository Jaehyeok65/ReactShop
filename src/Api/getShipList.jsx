import { dbService } from "../mybase";


export const getShipList = async(users, date) => {

    let array = []
    const data = await dbService.collection('shipping').where('uid','==', users.uid).where('date','>=', date.firstDate).where('date','<=',date.secondDate).get();
          data.forEach( item => {
              array.push(item.data());
          });
    return array;
  
  };