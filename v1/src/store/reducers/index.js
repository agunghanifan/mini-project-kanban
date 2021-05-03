import { combineReducers } from 'redux'
import userReducer from './userReducer'
import taskReducer from './taskReducer'

const reducer = combineReducers({
    userReducer,
    taskReducer
})

export default reducer