import React from 'react';
import PropTypes from 'prop-types';
import { editColor, startEdit, setColor, deleteTodo } from '../../actions';
import { connect } from 'react-redux';
import './todo.scss';

const mapDispatchToProps = dispatch => {
	return {
		editColor: id => dispatch(editColor(id)),
		deleteTodo: id => dispatch(deleteTodo(id)),
		setColor: (id, hex) => dispatch(setColor({ id, hex })),
		startEdit: todo => dispatch(startEdit(todo))
	};
};

const CardTodo = ({ todo, deleteTodo, setColor, startEdit }) => (
	<div className='todo-card card m-2' style={{ backgroundColor: todo.color }}>
		<div className='select-button' role='button'>
			<i className='mdi mdi-check' />
		</div>
		<div className='card-body mb-2' onClick={() => startEdit(todo)}>
			<h4 className='card-title h5'>{todo.name}</h4>
			{todo.content &&
			!Array.isArray(todo.content) && (
				<div role='textbox' className='card-text'>
					{todo.content}
				</div>
			)}
			{todo.content &&
			Array.isArray(todo.content) &&
			todo.content.length > 0 && (
				<div className='card-text'>
					<ul className='pl-3'>{todo.content.map(todo => <li key={todo}>{todo}</li>)}</ul>
				</div>
			)}
		</div>
		<div className='card-footer'>
			<label className='btn todo-card-action' htmlFor={'colorEdit' + todo.id}>
				<i className='mdi mdi-brush' />
			</label>
			<input
				className='d-none'
				name={'colorEdit' + todo.id}
				id={'colorEdit' + todo.id}
				type='color'
				value={todo.color || '#FFFFFF'}
				onChange={event => setColor(todo.id, event.target.value)}
			/>
			<button type='button' aria-label='Delete' onClick={() => deleteTodo(todo.id)} className='btn todo-card-action'>
				<i className='mdi mdi-delete' />
			</button>
		</div>
	</div>
);

CardTodo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(CardTodo);
