import TodoCard from '../components/Todo/TodoCard';
import { updateNew, SetNewColor, deleteNew } from '../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

// connect props to store actions
const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => dispatch(deleteNew(id)),
    setColor: (id, hex) => dispatch(SetNewColor({ id, hex })),
    updateTodo: todo => dispatch(updateNew(todo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);
