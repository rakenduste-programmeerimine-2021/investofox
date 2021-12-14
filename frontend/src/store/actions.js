export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_REMOVE = "USER_REMOVE"
export const USER_UPDATE = "USER_UPDATE"
export const ORDER_REMOVE = "ORDER_REMOVE"

//Login action that uses type USER_LOGIN, takes in data and sets data as the payload
export const loginUser = data => ({
    type: USER_LOGIN,
    payload: data
})

//Logout action that uses type USER_LOGOUT and takes in 0 parameters.
export const logoutUser = () => ({
    type: USER_LOGOUT,
})

export const deleteUser = id => ({
    type: USER_REMOVE,
    payload: id
})

export const updateUser = array => ({
    type: USER_UPDATE,
    payload: array
})
export const removeOrder = (id, orderId) => ({
    type: ORDER_REMOVE,
    payload: id, orderId
})

