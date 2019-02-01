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

        default:
            return state;
    }
}

export default todos;