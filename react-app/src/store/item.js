// ITEM ACTIONS:
const GET_ALL_ITEMS = 'item/GET_ALL_ITEMS';
const CREATE_ITEM = 'item/CREATE_ITEM';
const UPDATE_ITEM = 'item/UPDATE_ITEM';
const DELETE_ITEM = 'item/DELETE_ITEM';

//**********************************************************************************************
// ITEM ACTION CREATORS:
export const getAllItemsAC = (items) => ({
  type: GET_ALL_ITEMS,
  payload: items,
});

export const createItemAC = (item) => ({
  type: CREATE_ITEM,
  payload: item,
});

export const updateItemAC = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const deleteItemAC = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});


//********************************************************************************************


// ITEM THUNKS:
export const getAllItemsThunk = () => async (dispatch) => {
  const res = await fetch('/api/items/');
  if (res.ok) {
    const items = await res.json();
    dispatch(getAllItemsAC(items));
    return items;
  }
};

export const createItemThunk = (item) => async (dispatch) => {
  const res = await fetch('/api/items/create_item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(item),
  });
  console.log("res", res)
  if (res.ok) {

    const item = await res.json();
    dispatch(createItemAC(item));
    return item;
  }
};

export const updateItemThunk = (item, itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (res.ok) {
    const item = await res.json();
    dispatch(updateItemAC(item));
    return item;
  }
};

export const deleteItemThunk = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteItemAC(itemId));
    return itemId;
  }
};

//****************************************************************************************
// ITEM REDUCER:
const initialState = {};
const itemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_ITEMS:
      newState = {};
      action.payload.items.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    case CREATE_ITEM:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_ITEM:
      newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState;
    case DELETE_ITEM:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

export default itemReducer;
