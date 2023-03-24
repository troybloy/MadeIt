import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllShopsThunk, deleteShopThunk, updateShopThunk } from "../../store/shop";


const SingleShop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const shopId = useParams();

  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);
  const allShops = useSelector((state) => state.shops);
  const shop = allShops[shopId.shopId];



  useEffect(() => {

    (async () => {
      await dispatch(getAllShopsThunk())
      await setLoaded(true);
    })();
  }, []);


  const removeShop = (shopId) => async (e) => {
    e.preventDefault();
    dispatch(deleteShopThunk(shopId));
    history.push("/user-shops");
  };

  const updateShop = (shopId) => async (e) => {
    e.preventDefault();
    history.push(`/shops/${shopId}/update`);
  };

  return loaded && (
    <div>
      <div onClick={() => history.push(`/shops/${shop?.id}`)}>
        <h1>SingleShop</h1>
        <div><img className="shop-page-img"  src={shop?.shop_img} alt="Shop Image"></img></div>
        <div>{shop?.shop_name}</div>
        <div>{shop?.shop_description}</div>
      </div>
      <div>
      {(user?.id === shop?.owner_id) && (
        <div onClick={updateShop(shop?.id)}>Update Shop</div>
      )}
      </div>
      <div>
      {(user?.id === shop?.owner_id) && (
        <div onClick={removeShop(shop?.id)}>Remove Shop</div>
      )}
      </div>
    </div>
  );
}

export default SingleShop;
