import * as Constants from '../constants/action-types';

export const addTodo = payload => ({
    type: Constants.ADD_TODO,
    payload
})

export const deleteTodo = payload => ({
    type:  Constants.DELETE_TODO,
    payload
})

export const setColor = payload => ({
    type:  Constants.SET_COLOR,
    payload
})

export const editColor = name => ({
    type:  Constants.EDIT_COLOR,
    name
})

export const cancelEdit = toggleState => ({
    type:  Constants.CANCEL_EDIT,
    toggleState
})
