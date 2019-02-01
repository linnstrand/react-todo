const editState = (state = 'NONE', action) => {
    switch (action.type) {
        case 'EDIT_COLOR':
            return action.edit;

        default:
            return state;
    }
}

export default editState;