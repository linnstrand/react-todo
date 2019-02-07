import React from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo } from '../../actions/index';
import TodoInput from './TodoInput';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: name => dispatch(addTodo(name)),
		updateTodo: name => dispatch(updateTodo(name))
	};
};

const TodoNew = ({ addTodo, updateTodo }) => {
	let todo = {};

	const cancelTodo = () => {
		todo = {};
	};

	const onBlur = () => {
		todo.id ? updateTodo(todo) : addTodo(todo);
	};

	const onChange = (name, value) => {
		todo[name] = value;
	};

	return (
		<div className='d-inline-flex card todo-card new-todo-card'>
			<div className='new-todo-body'>
				<div className='new-todo-title new-todo-text'>
					<TodoInput
						name={'name'}
						todoInput={todo.name}
						placeholder={'Title'}
						onChange={(name, value) => onChange(name, value)}
						onBlur={(name, value) => onBlur(name, value)}
					/>
				</div>
				<div className='new-todo-text'>
					<TodoInput
						name={'content'}
						todoInput={todo.content}
						placeholder={'Write a note!'}
						onChange={(name, value) => onChange(name, value)}
						onBlur={() => onBlur()}
					/>
				</div>
			</div>
			{todo.content && (
				<div className='new-todo-menu'>
					<button aria-label='Discard' className='btn todo-icon-button' onCLick={cancelTodo}>
						<i className='mdi mdi-delete' />
					</button>
					<button aria-label='Save' className='btn todo-icon-button'>
						<i className='mdi mdi-content-save' />
					</button>
				</div>
			)}
		</div>
	);
};

export default connect(null, mapDispatchToProps)(TodoNew);
