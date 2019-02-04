import * as Constants from '../constants/action-types';

const initialState = [
	{ name: 'Shopping', content: [ 'Chicken', 'Yogurt', 'Milk', 'Potatoes' ] },
	{ name: 'Book Hair Appointment', content: 'Soon!' }
];

const todos = (state = initialState, action) => {
	switch (action.type) {
		case Constants.ADD_TODO:
			return state.concat(action.payload);
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

export default todos;
