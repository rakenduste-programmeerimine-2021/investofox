/* index defines the initial states of an application and combines reducers with the given states */
import { authReducer } from "./reducers"
import combineReducers from "react-combine-reducers"
import { createContext, useReducer } from "react"

//initial state of user and its token
const initialAuth = {
    token: null,
    user: null
}

//combines states to the reducer
const [combinedReducers, initialState] = combineReducers({
    auth: [authReducer, initialAuth]
})

export const Context = createContext(initialState)

function Store({ children }){
    const [state, dispatch] = useReducer(combinedReducers, initialState)

    return (<Context.Provider value={[ statr, dispatch]}>
        { children }
    </Context.Provider>)
}

export default Store