import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; //화면 전환에 필요한 라우터 임포트
import Home from './Router/Home';
import Login from './Router/Login';
import Product from './Router/Product';
import Shop from './Router/Shop';
import mybase, { dbService } from './mybase';
import Cart from './Router/Cart';
import MyShop from './Router/MyShop';
import Admin from './Router/Admin';
import Join from './Router/Join';
import WishList from './Router/WishList';
import Payment from './Router/Payment';
import OrderList from './Router/OrderList';
import OrderDetail from './Router/OrderDetail';



function App() { //최상위 컴포넌트로 데이터는 App에다가 저장하여 props로 전달해줄 것.

  const auth = mybase.auth();
  auth.setPersistence('session');
  const [input, setInput] = useState({
    name : '',  //상품 이름 
    userId : '',
    price : '',
    url : '',
    });

  const [good, setGood] = useState([]);
  const [user, setUser] = useState(null);

  //console.log(good);

  console.log(user);

  const joininfo = async(info) => {
    const data = auth.currentUser;
    await data.updateProfile({
      displayName : info.displayname
    });
  }








  const getGood = async() => {  //db에서 shop 아이템을 가져옴
    const item = await dbService.collection('shopping').get();
    item.forEach( doc => {
      setGood(prev => [
        ...prev,
        doc.data()
      ])
    })
  }



  useEffect( () => {
    auth.onAuthStateChanged( (user) => {
      if(user) {
        setUser({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        });
      }
      else {
        setUser(null);
      }
    })

    getGood();
  },[])

  //console.log(imgarray);

  /*const refreshUser = () => {
    const user = auth.currentUser;
    setUser({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }*/



  


  return (
    <Router>
      <Switch>
        <Route exact path='/'> 
          <Home Goods={good} user={user}/>
        </Route>
        <Route exact path='/shop'>
          <Shop Goods={good} user={user}/>
        </Route>
        <Route exact path='/product/:name'>
          <Product Goods={good} user={user} />
        </Route>
        <Route exact path='/login'>
          <Login user={user} />
        </Route>
        <Route exact path='/join'>
          <Join user={user} joininfo={joininfo} />
        </Route>
        <Route exact path='/cart'>
          <Cart user={user}/>
        </Route>
        <Route exact path='/myshop'>
          <MyShop user={user} />
        </Route>
        <Route exact path='/admin'>
          <Admin input = {input} setinput ={setInput} />
        </Route>
        <Route exact path='/wish'>
          <WishList user={user} />
        </Route>
        <Route exact path='/payment'>
          <Payment />
        </Route>
        <Route exact path='/order'>
          <OrderList />
        </Route>
        <Route exact path='/orderdetail/:orderid'>
          <OrderDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
