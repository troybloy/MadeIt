const GET_ALL_USERS = 'session/GET_ALL_USERS';


const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users

})


export const getAllUsersThunk = () => async (dispatch) => {
  const res = await fetch('/api/users/');

  if (res.ok) {
    const users = await res.json()
    dispatch(getAllUsers(users))
  console.log("users*****", users)
    return users
  }
}

const initialState = {}
const userReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_ALL_USERS:
      action.payload.users.forEach(user => {
        newState[user.id] = user
        })
      console.log("newState****", newState)
      return newState
    default:
      return state;
  }
};



export default userReducer;
