import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ShopsCard = ({ shop }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);


  return (
    <div className="shop-card-outer-container" onClick={() => history.push(`/shops/${shop?.id}`)}>
      {/* <div className="" onClick={() => history.push(`/shops/${shop?.id}`)}> */}
        <div className="shop-card-container">

          <div className="shop-card-inner-container">

            {/* <div className="shop-card-left"> */}
              <img src={shop?.shop_img} className="shop-card-img" alt="Shop Image"></img>
            {/* </div> */}
            <div className="shop-card-right">
              <div className="shop-card-name">{shop?.shop_name}</div>
              <div className="shop-card-description">{shop?.shop_description}</div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ShopsCard;
