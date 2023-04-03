import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { getAllItemsThunk } from '../../store/item'
import { getAllShopsThunk } from '../../store/shop'
import { deleteItemThunk } from '../../store/item'
import { getAllUsersThunk } from '../../store/user'
import UpdateItemForm from './UpdateItemForm'
import './SingleItem.css'

import defaultImg from '../Images/defaultImg.png'

const SingleItem = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const itemId = useParams()
  const [loaded, setLoaded] = useState(false)
  const itemShopId = useSelector(state => state?.item?.shop_id)
  const user = useSelector(state => state?.session.user)
  const allShops = useSelector(state => state.shops)

  const allItems = useSelector(state => state?.items)
  const item = allItems[itemId?.itemId]
  const itemPrice = item?.item_price

  const formattedPrice = (+itemPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  // console.log(formattedPrice)

  const itemShop = item?.shop_id
  const itemStateId = allItems[itemId]

  const shop = Object.values(allShops).filter(shop => shop?.id === itemShop)
  const shopOwnerId = shop[0]?.owner_id
  const shopId = shop[0]?.id
  const shopName = shop[0]?.shop_name

  useEffect(() => {
    ;(async () => {
      await dispatch(getAllItemsThunk())
      await dispatch(getAllShopsThunk())
      setLoaded(true)
    })()
  }, [dispatch])

  if (!loaded) return null

  if (!itemShop) return <Redirect to='/user-shops' /> // this is breaking the site currently

  const removeItem = itemId => async e => {
    // e.preventDefault();
    dispatch(deleteItemThunk(itemId))
      .then(() => dispatch(getAllItemsThunk()))
      .then(() => history.push(`/shops/${itemShop}`))
  }

  const updateItem = itemId => async e => {
    e.preventDefault()
    history.push(`/items/${itemId}/update`)
  }

  return (
    loaded && (
      <div className='item-page-container'>
        <div className='item-page-left'>
          <img
            className='item-page-img'
            src={item?.item_img}
            alt='Item Image'
            onError={(e) => { e.target.src = defaultImg }}
          />
        </div>

        <div className='item-page-right'>
          <div
            className='item-shop-name'
            // onClick={history.push(`/shops/${itemShopId}`)}
          >
            More from&nbsp;
            <a href={`/shops/${shopId}`} className='item-page-shop-link'>
              {shopName}
            </a>
          </div>
          <div className='item-name'>{item?.item_name}</div>
          <div className='item-price'>
            {formattedPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </div>
          <div className='item-description'>{item?.item_description}</div>

          {user?.id === item?.owner_id && (
            <div className='item-edit-buttons'>
              <div onClick={removeItem(item?.id)} className='item-edit-button'>
                Remove Item
              </div>
              <div onClick={updateItem(item?.id)} className='item-edit-button'>
                Update Item
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}
export default SingleItem
