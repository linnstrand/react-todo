import * as Constants from '../constants/action-types';
import { UpdateObject } from './util';

const initial = {
	target: undefined,
	targetChanged: false,
	checked: []
};

const editingToggle = (state, id) => {
	const newArray = state.checked.includes(id) ? state.checked.filter(i => i !== id) : state.checked.concat([id]);
	return UpdateObject(state, { checked: newArray });
};

const editingStart = (state, action) => {
	return Object.assign({}, state, { target: action });
};

const editing = (state = initial, action) => {
	switch (action.type) {
		case Constants.START_EDIT:
			return editingStart(state, action.payload);
		case Constants.SAVE_EDIT:
			return Object.assign({}, state, initial);
		case Constants.CANCEL_EDIT:
			return Object.assign({}, state, { target: undefined });
		case Constants.TOGGLE_CHECKED:
			return editingToggle(state, action.payload);

		default:
			return state;
	}
};

export default editing;
