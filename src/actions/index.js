import * as Constants from '../constants/action-types';

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

export const editColor = name => ({
	type: Constants.EDIT_COLOR,
	name
});

// Editing
export const startEdit = payload => ({
	type: Constants.START_EDIT,
	payload
});

export const saveEdit = payload => ({
	type: Constants.SAVE_EDIT,
	payload
});

export const cancelEdit = payload => ({
	type: Constants.CANCEL_EDIT,
	payload
});
