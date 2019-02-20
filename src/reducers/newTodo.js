import * as Constants from '../constants/action-types';
import { UpdateObject } from './util';

const initialState = { title: '', content: '', id: 0 };

const UpdateNew = (state, todo) => UpdateObject(state, todo);
const deleteNew = state => UpdateObject(state, initialState);
const SetNewColor = (state, todo) => UpdateObject(state, { color: todo.hex });

const newTodo = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_NEW_TODO':
			return UpdateNew(state, action.payload);
		case 'DELETE_NEW':
			return deleteNew(state, action.payload);
		case 'SET_NEW_COLOR':
			return SetNewColor(state, action.payload);
		default:
			return state;
	}
};

export default newTodo;
