import * as Constants from '../constants/action-types';

const initial = {
	on: false,
	target: undefined,
};

const editing = (state = initial, action) => {
	switch (action.type) {
		case Constants.START_EDIT:
			action.editing = true;
			return Object.assign({}, state, {on: true, target: action.payload});
		case Constants.SAVE_EDIT:
			return Object.assign({}, state, initial);
		case Constants.CANCEL_EDIT:
		return Object.assign({}, state, {on: false});
		default:
			return state;
	}
};

export default editing;
