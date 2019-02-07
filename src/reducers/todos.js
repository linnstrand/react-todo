import * as Constants from '../constants/action-types';

const initialState = [
	{ id: 1, name: 'Shopping', content: [ 'Chicken', 'Yogurt', 'Milk', 'Potatoes' ] },
	{ id: 2, name: 'Book Hair Appointment', content: 'Soon!' }
];

const todos = (state = initialState, action) => {
	switch (action.type) {
		case Constants.ADD_TODO:
			if (!todoExists(action.payload.id, state)) {
				let todo = action.payload;
				todo.id = state.length + 2;
				return [todo].concat(state);
			}
			return state;
		case Constants.UPDATE_TODO:
			return state.map(todo => {
				if (todo.id === action.payload.id) {
					return Object.assign({}, state, action.payload);
				}
				return todo;
			});
		case Constants.DELETE_TODO:
			return state.filter(todo => todo.id !== action.payload);

		case Constants.SET_COLOR:
			return state.map(todo => {
				if (todo.id === action.payload.id) {
					todo.color = action.payload.hex;
				}
				return todo;
			});
		default:
			return state;
	}
};

const todoExists = (id, state) => state.filter(todo => todo.id === id).length > 0;

export default todos;
