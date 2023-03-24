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
          <h1>Items coming soon!</h1>
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
        <Route path='/shops/:shopId'>
          <SingleShop />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
