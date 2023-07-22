import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'; //화면 전환에 필요한 라우터 임포트
import Home from './Router/Home';
import Login from './Router/Login/Login';
import Product from './Router/Product/Product';
import Shop from './Router/Shop';
import mybase from './mybase';
import Cart from './Router/Cart/Cart';
import MyShop from './Router/MyShop';
import Admin from './Router/Admin';
import Join from './Router/Join/Join';
import WishList from './Router/WishList/WishList';
import Payment from './Router/Payment/Payment';
import OrderList from './Router/OrderList/OrderList';
import OrderDetail from './Router/OrderList/OrderDetail';
import Write from './Router/Write/Write';
import Coummunity from './Router/Coummunity';
import useAsync from './Module/useAsync';
import { getList } from './Api/getList';



function App() { //최상위 컴포넌트로 데이터는 App에다가 저장하여 props로 전달해줄 것.

  const auth = mybase.auth();
  auth.setPersistence('session');
  const [input, setInput] = useState({
    name : '',  //상품 이름 
    userId : '',
    price : '',
    url : '',
    });

  const [state, refetch] : any = useAsync(getList, []);
  const [user, setUser] : any = useState();



  useEffect( () => {
    auth.onAuthStateChanged( (user) => {
      if(user) {
        setUser({
          displayname : user.displayName,
          uid : user.uid
        });
      }
      else {
        setUser(null);
      }
    })
  },[]);


  

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home Goods={state.data} user={user}/>} /> 
        <Route path='/shop' element={<Shop Goods={state.data} user={user} loading={state.loading}/>} />
        <Route path='/product/:name' element={<Product user={user} />} />
        <Route path='/login' element={<Login user={user} />} />
        <Route path='/join' element={ <Join user={user} />} />
        <Route path='/cart' element={<Cart user={user}/>} />
        <Route path='/myshop' element={<MyShop user={user} />} />
        <Route path='/admin' element={<Admin input = {input} setinput ={setInput} />} />
        <Route path='/wish' element={<WishList user={user} />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/order' element={<OrderList />} />
        <Route path='/orderdetail/:orderid' element={<OrderDetail />} />
        <Route path='/write/:name/:update' element={ <Write />} />
        <Route path='/coummunity' element={<Coummunity />} />
      </Routes>
    </Router>
  );
}

export default App;
