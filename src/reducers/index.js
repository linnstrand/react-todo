import { combineReducers } from 'redux';
import todos from './todos'
import editing from './editing'

const rootReducer = combineReducers({
    todos,
    editing
})

export default rootReducer;