/* Reducer takes in an action defined in actions.js. Then handles the state of an app using the action*/

import {USER_LOGIN, USER_LOGOUT } from "./actions";

const userReducer = (state, action) => {
    switch(action.type){
        //sets global state if the user to be logged in
        case USER_LOGIN:
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.id
            }
        //sets the user's global state to be null aka logged out
        case USER_LOGOUT:
            return{
                ...state,
                token: null,
                user: null
            }
        default:
            return state
    }

}

export {userReducer}