// SHOP ACTIONS:
const GET_ALL_SHOPS = 'shop/GET_ALL_SHOPS';
const CREATE_SHOP = 'shop/CREATE_SHOP';
const UPDATE_SHOP = 'shop/UPDATE_SHOP';
const DELETE_SHOP = 'shop/DELETE_SHOP';


//**************************************************************************************************
// SHOP ACTION CREATORS:
export const getAllShopsAC = (shops) => ({
  type: GET_ALL_SHOPS,
  payload: shops,
});

export const createShopAC = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

export const updateShopAC = (shop) => ({
  type: UPDATE_SHOP,
  payload: shop,
});

export const deleteShopAC = (shopId) => ({
  type: DELETE_SHOP,
  payload: shopId,
});

//**************************************************************************************************
// SHOP THUNKS:
export const getAllShopsThunk = () => async (dispatch) => {
  const res = await fetch('/api/shops/');
  if (res.ok) {
    const shops = await res.json();
    dispatch(getAllShopsAC(shops));
    return shops;
  }
};

export const createShopThunk = (shop) => async (dispatch) => {
  const res = await fetch('/api/shops/create_shop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shop),
  });
  if (res.ok) {
    const shop = await res.json();
    dispatch(createShopAC(shop));
    return shop;
  }
};

export const updateShopThunk = (shop, shopId) => async (dispatch) => {
  const res = await fetch(`/api/shops/${shopId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shop),
  });
  console.log("UPDATE RESPONSE ", res)
  if (res.ok) {
    const shop = await res.json();
    dispatch(updateShopAC(shop));
    return shop;
  }
};

export const deleteShopThunk = (shopId) => async (dispatch) => {
  const res = await fetch(`/api/shops/${shopId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteShopAC(shopId));
  }
};

//**************************************************************************************************
// SHOP REDUCER:
const initialState = {};
const shopReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SHOPS:
      newState = {}
      action.payload.shops.forEach(shop => {
        newState[shop.id] = shop;
      })
      return newState;
    case CREATE_SHOP:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_SHOP:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SHOP:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default shopReducer;
