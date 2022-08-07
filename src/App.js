import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; //화면 전환에 필요한 라우터 임포트
import Home from './Router/Home';
import Login from './Router/Login';
import Product from './Router/Product';
import Shop from './Router/Shop';
import mybase, { dbService } from './mybase';
import Cart from './Router/Cart';
import MyShop from './Router/MyShop';
import Admin from './Router/Admin';


/*const storage = storageService.refFromURL('gs://reactshop-b5520.appspot.com/shop1.PNG');
console.log(storage.getDownloadURL('gs://reactshop-b5520.appspot.com/shop1.PNG'));*/

function App() { //최상위 컴포넌트로 데이터는 App에다가 저장하여 props로 전달해줄 것.

  const [input, setInput] = useState({
    name : '',  //상품 이름 
    userId : '',
    price : '',
    url : '',
    });

  const [good, setGood] = useState([]);

  console.log(good);








  const getGood = async() => {  //db에서 shop 아이템을 가져옴
    const item = await dbService.collection('shopping').get();
    item.forEach( doc => {
      setGood(prev => [
        ...prev,
        doc.data()
      ])
    })
  }

  const auth = mybase.auth();
  const [user, setUser] = useState(null);

  useEffect( () => {
    auth.onAuthStateChanged( (user) => {
      if(user) {
        setUser({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        });
      }
    })

    getGood();
  },[])

  //console.log(imgarray);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUser({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }



  


  return (
    <Router>
      <Switch>
        <Route exact path='/'> 
          <Home Goods={good}/>
        </Route>
        <Route exact path='/shop'>
          <Shop Goods={good}/>
        </Route>
        <Route exact path='/product/:name'>
          <Product Goods={good} />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/myshop'>
          <MyShop />
        </Route>
        <Route exact path='/admin'>
          <Admin input = {input} setinput ={setInput} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
