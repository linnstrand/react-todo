import * as Constants from '../constants/action-types';

const initialState = {
	editing: false,
	type: '',
	name: ''
};

const editState = (state = initialState, action) => {
	switch (action.type) {
		case Constants.EDIT_COLOR:
			action.editing = true;
			return Object.assign({}, state, action);
		case Constants.CANCEL_EDIT:
			return Object.assign({}, state, initialState);
		default:
			return state;
	}
};

export default editState;
