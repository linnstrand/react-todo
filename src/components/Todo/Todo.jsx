import React from 'react';
import PropTypes from 'prop-types';
import './todo.scss';

const CardTodo = ({ todo, setColor, deleteTodo }) => (
	<div className='todo-card card m-2' style={{ backgroundColor: todo.color }}>
		<div className='select-button' role='button'>
			<i className='mdi mdi-check' />
		</div>
		<div className='card-body mb-2'>
			<div className='card-title h5' contentEditable='true' aria-multiline='true' suppressContentEditableWarning='true'>
				{todo.name}
			</div>
			{todo.content &&
			!Array.isArray(todo.content) && (
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					className='card-text card-editable'>
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
			<label className='btn todo-card-action' htmlFor='colorEdit'>
				<i className='mdi mdi-brush' />
			</label>
			<input
				className='d-none'
				name='colorEdit'
				id='colorEdit'
				type='color'
				value={todo.color || '#FFFFFF'}
				onChange={event => setColor(todo.name, event.target.value)}
			/>
			<button type='button' aria-label='Delete' onClick={() => deleteTodo(todo.name)} className='btn todo-card-action'>
				<i className='mdi mdi-delete' />
			</button>
			<button aria-label='Archive' className='btn todo-card-action'>
				<i className='mdi mdi-archive' />
			</button>
		</div>
	</div>
);

CardTodo.propTypes = {
	todo: PropTypes.object.isRequired,
	setColor: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired
};

export default CardTodo;
