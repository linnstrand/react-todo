import Todo from '../components/Todo/Todo';
import { editingCancel, editingStart, UpdateNew, SetNewColor, deleteNew } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
	...ownProps
});

const mapDispatchToProps = dispatch => {
	return {
        deleteTodo: id => dispatch(deleteNew(id)),
		setColor: (id, hex) => dispatch(SetNewColor({ id, hex })),
		updateTodo: todo => dispatch(UpdateNew(todo)),
		editingCancel: () => dispatch(editingCancel()),
		editingStart: id => dispatch(editingStart(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
