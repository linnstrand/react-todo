import * as Constants from '../action-types';

export const addTodo = payload => ({
  type: Constants.ADD_TODO,
  payload
});

export const updateTodo = payload => ({
  type: Constants.UPDATE_TODO,
  payload
});

export const deleteTodo = payload => ({
  type: Constants.DELETE_TODO,
  payload
});

export const updateNewTodo = payload => ({
  type: 'UPDATE_NEW_TODO',
  payload
});

const initialState = {
  list: [
    {
      id: 1,
      name: 'Shopping',
      content:
        '<ul><li>Chicken</li><li>Yogurt</li><li>Milk</li><li>Potatoes</ul>',
      hasBullets: true
    },
    { id: 2, name: 'Book Hair Appointment', content: '<div>Soon!</div>' }
  ],
  newTodo: { name: '', content: '', id: 0 }
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case Constants.ADD_TODO:
      action.payload.id =
        state.list.reduce((a, b) => (a > b.id ? a : b.id), 0) + 1;
      return {
        ...state,
        list: [action.payload, ...state.list],
        newTodo: { name: '', content: '', id: 0 }
      };

    case Constants.UPDATE_TODO:
      let newList = state.list.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      return { ...state, list: newList };

    case Constants.DELETE_TODO:
      if (action.payload === 0) {
        return { ...state, newTodo: { name: '', content: '', id: 0 } };
      }
      return {
        ...state,
        list: state.list.filter(todo => todo.id !== action.payload)
      };

    case 'UPDATE_NEW_TODO':
      return { ...state, newTodo: action.payload };

    default:
      return state;
  }
};

export default todos;
