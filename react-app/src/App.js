import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllShops from './components/Shops/AllShops';
import CreateShopForm from './components/Shops/CreateShopForm';
import UpdateShopForm from './components/Shops/UpdateShopForm';
import SingleShop from './components/Shops/SingleShop';
import UserShops from './components/Shops/UserShops';

import SingleItem from './components/Items/SingleItem';
import CreateItemForm from './components/Items/CreateItemForm';
import UpdateItemForm from './components/Items/UpdateItemForm';

import SplashPage from './components/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      <Switch>
      <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users' exact={true} >
          <UsersList />
        </Route>
        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>
        <Route path='/shops' exact={true} >
          <AllShops />
        </Route>
        <Route path='/user-shops'>
          <UserShops />
        </Route>
        <Route path='/create-shop-form' exact={true} >
          <CreateShopForm />
        </Route>
        <Route path='/shops/:shopId/update' >
          <UpdateShopForm />
        </Route>
        <ProtectedRoute path='/shops/:shopId/create-item-form' exact={true}>
          <CreateItemForm />
        </ProtectedRoute>
        <ProtectedRoute path="/items/:itemId/update" exact={true}>
          <UpdateItemForm />
        </ProtectedRoute>
        <Route path='/shops/:shopId'>
          <SingleShop />
        </Route>
        <Route path='/items/:itemId' exact={true}>
          <SingleItem />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
