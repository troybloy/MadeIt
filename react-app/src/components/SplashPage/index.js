import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllShopsThunk } from '../../store/shop';
import { getAllItemsThunk } from '../../store/item';
// import ShopsCard from '../ShopCard';
import ItemsCard from '../ItemCard';
import "./SplashPage.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const shops = useSelector((state) => state.shops);
  const items = useSelector((state) => state.items);
  const shopsArray = Object.values(shops);
  const limitShops = shopsArray.slice(0, 6)
  const itemsArray = Object.values(items).slice(0, 10);

  useEffect(() => {
    dispatch(getAllShopsThunk()).then(() => dispatch(getAllItemsThunk()))
  }, [dispatch]);

  return (
    <div className="splashPage-all">
      <div className="splash-page-container">
        <div className="SP-banner"> { shopsArray.length > 0 ?
          <div className="SP-shops-header">Find things you'll love. Support Troy. Here are some featured MadeIt stores!</div>
          :
          <div className="SP-no-shops-header">We seem to have no MadeIt shops at this time.</div>
        }
          <div className="SP-shops-outer-container">
            {limitShops.map((shop) => (
              <div className="SP-shop-card-container outer" >
                <div className="SP-shop-img-container" >
                  <img
                    src={shop?.shop_img}
                    onClick={() => history.push(`/shops/${shop?.id}`)}
                    className="SP-shop-card-img"
                    alt="Shop Image"
                  />
         why       </div>
                <div
                  className="SP-shop-name-container"
                  onClick={() => history.push(`/shops/${shop?.id}`)}
                >
                  {shop?.shop_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="SP-items-header-container"> { itemsArray.length > 0 ?
          <div className="SP-items-header">Featured Items</div>
          :
          <div className="SP-no-items-header">We seem to have no items at this time.</div>
        }
        </div>
      <div className="SP-items-outer-container">
        <div className="SP-item-cards-container">
          {itemsArray.map((item) => (
            <div className="SP-single-item-card">
              <ItemsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SplashPage;
