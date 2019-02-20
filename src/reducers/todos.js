import * as Constants from '../constants/action-types';
import { UpdateObjectInArray, UpdateObject } from './util';

const initialState = [
	{ id: 1, name: 'Shopping', content: '<ul><li>Chicken</li><li>Yogurt</li><li>Milk</li><li>Potatoes</ul>', hasBullets: true },
	{ id: 2, name: 'Book Hair Appointment', content: '<div>Soon!</div>' }
];

const AddTodo = (oldArray, newObject) => {
	newObject.id = oldArray.length + 2;
	return [newObject].concat(oldArray);
};

const UpdateTodo = (state, todo) => UpdateObjectInArray(state, todo.id, oldItem => UpdateObject(oldItem, todo));
const DeleteTodo = (state, itemId) => state.filter(todo => todo.id !== itemId);
const SetTodoColor = (state, todo) => {
	return UpdateObjectInArray(state, todo.id, oldItem => {
		return UpdateObject(oldItem, { color: todo.hex });
	});
};

const todos = (state = initialState, action) => {
	switch (action.type) {
		case Constants.ADD_TODO:
			return AddTodo(state, action.payload);
		case Constants.UPDATE_TODO:
			return UpdateTodo(state, action.payload);
		case Constants.DELETE_TODO:
			return DeleteTodo(state, action.payload);
		case Constants.SET_COLOR:
			return SetTodoColor(state, action.payload);
		default:
			return state;
	}
};

export default todos;
