import * as Constants from '../constants/action-types';
import { UpdateObject } from './util';

const initial = {
	on: false,
	target: undefined,
	targetChanged: false,
	checked: []
};

const ToggleTodo = (state, id) => {
	const newArray = state.checked.includes(id) ? state.checked.filter(i => i !== id) : state.checked.concat([ id ]);
	return UpdateObject(state, { checked: newArray });
};

const editing = (state = initial, action) => {
	switch (action.type) {
		case Constants.START_EDIT:
			action.editing = true;
			return Object.assign({}, state, { on: true, target: action.payload });
		case Constants.SAVE_EDIT:
			return Object.assign({}, state, initial);
		case Constants.CANCEL_EDIT:
			return Object.assign({}, state, { on: false });
		case Constants.TOGGLE_CHECKED:
			return ToggleTodo(state, action.payload);

		default:
			return state;
	}
};

export default editing;
