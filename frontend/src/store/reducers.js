/* Reducer takes in an action defined in actions.js. Then handles the state of an app using the action*/

import { USER_UPDATE, USER_REMOVE, USER_LOGIN, USER_LOGOUT } from "./actions";

const userReducer = (state, action) => {
    switch(action.type){
        case USER_LOGIN:
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
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