import { ADD_TODO } from '../constants/action-types';

const initialState = [
    { name: 'Shopping', content: ['Chicken', 'Yogurt', 'Milk', 'Potatoes'] },
    { name: 'Book Hair Appointment', content: 'Soon!' }
]

const todos = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: state.todos.concat(action.payload) // avoid mutation for arrays
            })
        case 'DELETE_TODO':
            return state.filter(todo => todo.name !== action.payload)

        case 'SET_COLOR':
            return state.map(todo => {
                if (todo.name === action.payload.name) {
                    todo.color = action.payload.hex;
                }
                return todo;
            })
        default:
            return state;
    }
}

export default todos;