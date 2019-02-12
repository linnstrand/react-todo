import * as Constants from '../constants/action-types';

const initialState = [
	{ id: 1, name: 'Shopping', content: [ 'Chicken', 'Yogurt', 'Milk', 'Potatoes' ] },
	{ id: 2, name: 'Book Hair Appointment', content: 'Soon!' }
];

const UpdateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues);

const UpdateObjectInArray = (oldArray, itemId, callback) => {
	return oldArray.map(item => {
		if (item.id !== itemId) {
			return item;
		}
		return callback(item);
	});
};

// const ObjectExists = (itemId, oldArray) => oldArray.filter(item => item.id === itemId).length > 0;

const AddTodo = (oldArray, newObject) => {
	newObject.id = oldArray.length + 2;
	return [ newObject ].concat(oldArray);
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
