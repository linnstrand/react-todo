import { ADD_TODO } from '../constants/action-types';


export function addToDo(payload) {
    return { type: ADD_TODO, payload };
};