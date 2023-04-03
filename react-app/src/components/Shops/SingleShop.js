import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllShopsThunk, deleteShopThunk, updateShopThunk } from "../../store/shop";
import ItemCard from "../ItemCard";
import { getAllItemsThunk } from "../../store/item";
import './SingleShop.css'
import defaultImg from '../Images/defaultImg.png'


const SingleShop = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shopId = useParams();
  const [loaded, setLoaded] = useState(false);
  // (below) Need to use later for pulling only the shops
  // that belong to that logged in user (below)
  const user = useSelector((state) => state.session.user);
  const allShops = useSelector((state) => state.shops);
  const shop = allShops[shopId.shopId];
  const thisShopId = parseInt(shopId.shopId);

  //items
  const allItems = useSelector((state) => state.items);
  const itemsArray = Object.values(allItems).filter((item) => item?.shop_id === shop?.id);
  // console.log("allitems", allItems);
  // console.log("itemsArray", itemsArray);





  useEffect(() => {

    (async () => {
      dispatch(getAllShopsThunk()).then(() =>dispatch(getAllItemsThunk())).then(() => setLoaded(true));

    })();
  }, [dispatch]);

  if (!loaded) return null

  // useEffect(() => {
  //     dispatch(getAllShopsThunk()).then(() => dispatch(getAllItemsThunk()))
  //     .then(() => setLoaded(true))
  //   }, []);


  // if (shop?.id != thisShopId) return <Redirect to="/user-shops" />

  console.log("shop.id", shop?.id)
  console.log("shopId", shopId.shopId)
  console.log("thisShopId", thisShopId)

  const removeShop = (shopId) => async (e) => {
    e.preventDefault();
    dispatch(deleteShopThunk(shopId));
    history.push("/user-shops");
  };

  const updateShop = (shopId) => async (e) => {
    e.preventDefault();
    history.push(`/shops/${shopId}/update`);
  };

  const addItem = (shopId) => async (e) => {
    e.preventDefault();
    history.push(`/shops/${shopId}/create-item-form`);
  };

  return loaded && (
    <div className="singleShop-all">
      <div className="SS-orange-banner">
        <div className="singleShop-header">
          <div className="header-left">
            <div onLoad={() => history.push(`/shops/${shop.id}`)}>
              <div>
                <img
                  className="shop-page-img"
                  src={shop?.shop_img}
                  alt="Shop Image"
                  onError={(e) => { e.target.src=defaultImg}}
                />
              </div>
            </div>

            <div className="SS-name-description">
              <div className="SS-shop-name">{shop?.shop_name}</div>
              <div className="SS-shop-description">{shop?.shop_description}</div>
            </div>
          </div>

          {(user?.id === shop?.owner_id) && (
            <div className="header-right">
              <div className="shop-option-button" onClick={updateShop(shop?.id)}>
                Update Shop
              </div>
              <div className="shop-option-button" onClick={removeShop(shop?.id)}>
                Remove Shop
              </div>
              <div className="shop-option-button" onClick={addItem(shop?.id)}>
                Add Item
              </div>
            </div>
          )}
        </div>
      </div>
      {itemsArray.length > 0 ?
        <div className="items-header">All items from {shop?.shop_name}</div>
        :
        <div className="items-header">{shop?.shop_name} is out of stock</div>
      }
      <div className="SS-items-outer-container">
        <div className="SS-item-cards-container">
          {itemsArray.map((item) => (
            <div className="SP-single-item-card" key={item?.id} >
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleShop;
