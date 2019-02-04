import React from 'react';
import { editColor, cancelEdit, setColor, deleteTodo } from '../actions';
import TodoNew from '../components/Todo/TodoNew';
import CardTodo from '../components/Todo/Todo';
import { connect } from 'react-redux';
import ColorEditer from '../components/ColorEditer';

const mapStateToProps = state => ({
	todos: state.todos,
	editState: state.editState
});

const mapDispatchToProps = dispatch => {
	return {
		editColor: name => dispatch(editColor(name)),
		deleteTodo: name => dispatch(deleteTodo(name)),
		cancelEdit: () => dispatch(cancelEdit()),
		setColor: (name, hex) => dispatch(setColor({ name, hex }))
	};
};

const Home = ({ todos, editState, editColor, cancelEdit, deleteTodo, setColor }) => {
	const saveEdit = (name, hex) => {
		setColor(name, hex);
		cancelEdit();
	};

	return (
		<React.Fragment>
			<h3>{editState.name}</h3>
			<div className='d-inline-flex align-items-start flex-wrap'>
				{todos.map(item => (
					<CardTodo key={item.name} todo={item} editColor={editColor} deleteTodo={deleteTodo} className='shadow-sm card m-2' />
				))}
			</div>
			<TodoNew />
			<ColorEditer editState={editState} cancelEdit={() => cancelEdit()} saveEdit={saveEdit} />
		</React.Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
