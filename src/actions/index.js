import { ADD_TODO } from '../constants/action-types';

export const addTodo = payload => ({
    type: ADD_TODO,
    payload
})

export const deleteTodo = payload => ({
    type: 'DELETE_TODO',
    payload
})

export const setColor = payload => ({
    type: 'SET_COLOR',
    payload
})

export const editColor = name => ({
    type: 'EDIT_COLOR',
    name
})

export const cancelEdit = toggleState => ({
    type: 'CANCEL_EDIT',
    toggleState
})
