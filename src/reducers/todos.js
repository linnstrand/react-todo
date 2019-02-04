import * as Constants from '../constants/action-types';

const initialState = [
	{ name: 'Shopping', content: [ 'Chicken', 'Yogurt', 'Milk', 'Potatoes' ] },
	{ name: 'Book Hair Appointment', content: 'Soon!' }
];

const todos = (state = initialState, action) => {
	switch (action.type) {
		case Constants.ADD_TODO:
			if (!todoExists(action.payload.name, state)) {
				return state.concat(action.payload);
			}
			return state;
		case Constants.DELETE_TODO:
			return state.filter(todo => todo.name !== action.payload);

		case Constants.SET_COLOR:
			return state.map(todo => {
				if (todo.name === action.payload.name) {
					todo.color = action.payload.hex;
				}
				return todo;
			});
		default:
			return state;
	}
};

const todoExists = (name, state) => state.filter(todo => todo.name === name).length > 0;

export default todos;
