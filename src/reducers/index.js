import { combineReducers } from 'redux';
import todos from './todos'
import editState from './editState'

const rootReducer = combineReducers({
    todos,
    editState
})

export default rootReducer;