import { ADD_TODO } from '../constants/action-types';

export const addToDo = payload => ({
    type: ADD_TODO, 
    payload
})

export const editColor = name => ({
    type: 'EDIT_COLOR',
    name
})

export const toggleEdit = toggleState => ({
    type: 'TOGGLE_EDIT',
    toggleState
})
