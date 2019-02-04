const initialState = {
    editing: false,
    type: '',
    name: ''
}


const editState = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_COLOR':
            action.editing = true;
            return Object.assign({}, state, action);
        case 'CANCEL_EDIT':
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}

export default editState;