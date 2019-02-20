import Todo from '../components/Todo/Todo';
import { setColor, deleteTodo, updateTodo, editingCancel, editingToggle, editingStart } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
	...ownProps
  })

const mapDispatchToProps = dispatch => {
	return {
		deleteTodo: id => dispatch(deleteTodo(id)),
		setColor: (id, hex) => dispatch(setColor({ id, hex })),
		updateTodo: todo => dispatch(updateTodo(todo)),
		editingToggle: id => dispatch(editingToggle(id)),
		editingCancel: () => dispatch(editingCancel()),
		editingStart: id => dispatch(editingStart(id))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
