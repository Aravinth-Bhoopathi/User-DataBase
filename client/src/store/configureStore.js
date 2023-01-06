import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import adminReducer from '../reducers/adminReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducer,
        admin : adminReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore