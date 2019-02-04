import React from 'react';
import { editColor, cancelEdit, setColor, deleteTodo } from '../actions';
import TodoNew from '../components/Todo/TodoNew';
import CardTodo from '../components/Todo/Todo';
import { connect } from 'react-redux';
import Editer from '../components/Editer';

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

const Home = ({ todos, editState, cancelEdit, deleteTodo, setColor }) => {
	return (
		<React.Fragment>
			<TodoNew />
			<div className='d-inline-flex align-items-start flex-wrap'>
				{todos.map(item => (
					<CardTodo key={item.name} todo={item} setColor={setColor} deleteTodo={deleteTodo} className='shadow-sm card m-2' />
				))}
			</div>
			<Editer editState={editState} cancelEdit={() => cancelEdit()} />
		</React.Fragment>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
