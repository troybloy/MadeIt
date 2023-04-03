import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './ItemCard.css'

import defaultImg from '../Images/defaultImg.png'


const ItemsCard = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const shopId = useParams();
  const allShops = useSelector((state) => state.shops);
  const shop = allShops[shopId.shopId];
  const user = useSelector((state) => state.session.user);
  const itemPrice = item?.item_price

  const formattedPrice = (+itemPrice).toLocaleString("en-US", {style:"currency", currency:"USD"})

  // console.log("shop", )
  // console.log("item", item)
  return (
    <div className="item-card-outer-container" onClick={() => history.push(`/items/${item?.id}`)}>
      <div className="item-card-container">
      <div className="item-card-price">
          <span>
            {formattedPrice}
          </span>
        </div>
        <img
          src={item?.item_img}
          className="item-card-img"
          alt="Item Image"
          onError={(e) => { e.target.src = defaultImg }}
        />
      </div>
    </div>
  );
}

export default ItemsCard;
