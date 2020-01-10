import TodoCard from '../components/Todo/TodoCard';
import { setColor, deleteTodo, updateTodo } from '../store/reducers/todos';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => dispatch(deleteTodo(id)),
    setColor: (id, hex) => dispatch(setColor({ id, hex })),
    updateTodo: todo => dispatch(updateTodo(todo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);
