import { combineReducers } from 'redux';
import todos from './todos'
import editing from './editing'
import newTodo from './newTodo'

const rootReducer = combineReducers({
    todos,
    editing,
    newTodo
})

export default rootReducer;