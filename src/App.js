import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; //화면 전환에 필요한 라우터 임포트
import Home from './Router/Home';
import Login from './Router/Login';
import Product from './Router/Product';
import Shop from './Router/Shop';
import mybase from './mybase';
import Cart from './Router/Cart';

function App() { //최상위 컴포넌트로 데이터는 App에다가 저장하여 props로 전달해줄 것.

  const Goods = [
    {
      id : 1,
      price : '95,000',
      url : '/image/shop1.PNG',
      name : 'OVERSIZED MODS WOOL BLAZER [BLACK]'
    },
    {
      id : 2,
      price : '85,000',
      url : '/image/shop2.PNG',
      name : 'AIRY ZIP-UP COLLAR HALF KNIT [BLACK]'
    },
    {
      id : 3,
      price : '75,000',
      url : '/image/shop3.PNG',
      name : 'OVERSIZED PULLOVER COLLAR HALF SLEEVE SHIRTS [SKYBLUE]'
    },
    {
      id : 4,
      price : '65,000',
      url : '/image/shop4.PNG',
      name : 'PAPER COTTON OVER-FIT HALF SLEEVE SHIRT [BLACK]'
    },
    {
      id : 5,
      price : '45,000',
      url : '/image/shop5.PNG',
      name : 'AIRY ROUND HALF KNIT [SKY BLUE]'
    },
    {
      id : 6,
      price : '35,000',
      url : '/image/shop6.PNG',
      name : 'AIRY ZIP-UP COLLAR HALF KNIT [CREAM]'
    }
  ]

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
  },[])

  const refreshUser = () => {
    const user = auth.currentUser;
    setUser({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }

  console.log(user);


  


  return (
    <Router>
      <Switch>
        <Route exact path='/'> 
          <Home Goods={Goods}/>
        </Route>
        <Route exact path='/shop'>
          <Shop Goods={Goods}/>
        </Route>
        <Route exact path='/product/:id'>
          <Product Goods={Goods} />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
