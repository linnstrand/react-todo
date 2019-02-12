import React from 'react';
import TodoNew from '../components/Todo/TodoNew';
import CardTodo from '../components/Todo/Todo';
import { connect } from 'react-redux';
import Editer from '../components/Editer';

const mapStateToProps = state => ({
	todos: state.todos,
	editing: state.editing
});

const Home = ({ todos, editing }) => {
	return (
		<React.Fragment>
			<div className='m-2'>
				<TodoNew />
			</div>
			<div className='d-inline-flex align-items-start flex-wrap'>
				{todos.map(item => (
					<CardTodo key={item.id} todo={item} checked={editing.checked.includes(item.id)} className='shadow-sm card m-2' />
				))}
			</div>
			{editing.on && <Editer />}
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(Home);
