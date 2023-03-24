import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import { getAllUsersThunk } from '../../store/user';
import { getAllShopsThunk } from '../../store/shop';
// import CreateShopForm from '../Shops/CreateShopForm';
import ShopsCard from '../ShopCard';

const UserShops = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.shops);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllShopsThunk()).then(() => dispatch(getAllUsersThunk())).then(() => setLoaded(true))
  }, [])

  if (!loaded) return null
  if (!sessionUser) return <Redirect to="/" />

  const shopsArray = Object.values(shops)
  const userShops = shopsArray.filter(shop => shop.owner_id === sessionUser.id)


  return loaded && (
    <>
      <div>
        <div className="create-shop-button" onClick={() => history.push('/create-shop-form')}>Create a shop</div>
      </div>
      {
        userShops.map(shop => (<ShopsCard shop={shop} key={shop.id} />))
      }
    </>
  )
}

export default UserShops;
