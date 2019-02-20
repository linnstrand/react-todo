import * as Constants from '../constants/action-types';

// const makeActionCreator = (type, ...args) => (...args) => {
// 	const action = { type };
// 	args.forEach((arg, index) => {
// 		action[args[index]] = args[index];
// 	});
// 	return action;
// };
// export const UpdateNew = makeActionCreator('UPDATE_NEW_TODO', 'payload');
// export const deleteNew = makeActionCreator('DELETE_NEW', 'payload');
// export const SetNewColor = makeActionCreator('SET_NEW_COLOR', 'payload');

export const UpdateNew = payload => ({
	type: 'UPDATE_NEW_TODO',
	payload
});
export const deleteNew = payload => ({
	type: 'DELETE_NEW',
	payload
});
export const SetNewColor = payload => ({
	type: 'SET_NEW_COLOR',
	payload
});

// Todos
export const addTodo = payload => ({
	type: Constants.ADD_TODO,
	payload
});

export const updateTodo = payload => ({
	type: Constants.UPDATE_TODO,
	payload
});

export const deleteTodo = payload => ({
	type: Constants.DELETE_TODO,
	payload
});

export const setColor = payload => ({
	type: Constants.SET_COLOR,
	payload
});

export const resetTodo = payload => ({
	type: Constants.RESET_TODO,
	payload
});

// Editing
export const editingStart = payload => ({
	type: Constants.START_EDIT,
	payload
});

export const saveEdit = payload => ({
	type: Constants.SAVE_EDIT,
	payload
});

export const editingCancel = payload => ({
	type: Constants.CANCEL_EDIT,
	payload
});

export const editingToggle = payload => ({
	type: Constants.TOGGLE_CHECKED,
	payload
});
