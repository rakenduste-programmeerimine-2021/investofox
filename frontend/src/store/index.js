/* index defines the initial states of an application and combines reducers with the given states */
import { userReducer } from "./reducers"
import combineReducers from "react-combine-reducers"
import { createContext, useReducer, useEffect } from "react"


//initial state of user and its token
const initialAuth = {
    token: null,
    user: null
}

//combines states to the reducer
const [combinedReducers, initialState] = combineReducers({
    auth: [userReducer, initialAuth]
})

export const Context = createContext(initialState)

function Store({ children }){
    const [state, dispatch] = useReducer(combinedReducers, initialState, () => {
        const localData = localStorage.getItem('user')
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state))
    }, [state])



    return (
    <Context.Provider value={[ state, dispatch]}>
        { children }
    </Context.Provider>)
}

export default Store