import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editColor, setColor, deleteTodo, updateTodo } from '../../actions';
import { connect } from 'react-redux';
import TodoInput from './TodoInput';
import './todo.scss';

const mapDispatchToProps = dispatch => {
	return {
		editColor: id => dispatch(editColor(id)),
		deleteTodo: id => dispatch(deleteTodo(id)),
		setColor: (id, hex) => dispatch(setColor({ id, hex })),
		updateTodo: todo => dispatch(updateTodo(todo))
	};
};

class CardTodo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todo: this.props.todo,
			originalTodo: Object.assign({}, this.props.todo),
			isChanged: false,
			activeClass: '',
			checked: false
		};
	}

	isChanged = todo => todo.name !== this.state.originalTodo.name || todo.content !== this.state.originalTodo.content;

	onClose = () => {
		this.setState({ activeClass: '' });
	};

	onChange = (name, value) => {
		let changed = Object.assign({}, this.state.todo);
		changed[name] = value;
		this.setState({ isChanged: this.isChanged(changed), todo: changed });
	};

	onCancel = () => {
		this.setState({ todo: Object.assign({}, this.state.originalTodo) });
	};

	activateEdit = () => {
		this.setState({ activeClass: ' is-editing' });
	};

	checkTodo() {
		this.setState({ checked: !this.state.checked });
	}

	handleChange = (event) => {
		let changed = Object.assign({}, this.state.todo);
		changed[event.target.name] = event.target.value;
		this.setState({ isChanged: this.isChanged(changed), todo: changed });
		this.setState({ value: event.target.value });
	}

	render() {
		let todo = this.state.todo;
		return (
			<div
				className={'todo-card card' + this.state.activeClass + (this.state.checked ? ' is-checked' : '')}
				style={{ backgroundColor: todo.color }}>
				<div className={'select-button'} role='button' aria-label='Check Todo' onClick={() => this.checkTodo()}>
					<i className='mdi mdi-check' />
				</div>
				<div className='card-body mb-2' onClick={this.activateEdit}>
					<TodoInput
						name={'name'}
						todoInput={todo.name}
						stylingClasses={'card-title h5'}
						onChange={(name, value) => this.onChange(name, value)}
						onBlur={() => console.log('blurred')}
					/>
					{!Array.isArray(todo.content) && (
						// <TodoInput
						// 	name={'content'}
						// 	todoInput={todo.content}
						// 	stylingClasses={'card-text'}
						// 	onChange={(name, value) => this.onChange(name, value)}
						// 	onBlur={() => console.log('blurred')}
						// />
						<textarea name='content' id={'content' + todo.id} value={todo.content} onChange={this.handleChange} />
					)}
					{Array.isArray(todo.content) &&
					todo.content.length > 0 && (
						<div className='card-text'>
							<ul className='pl-3'>{todo.content.map(todo => <li key={todo}>{todo}</li>)}</ul>
						</div>
					)}
				</div>
				<div className='card-footer'>
					<div className='d-inline-flex'>
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
						{this.state.isChanged && (
							<button type='button' aria-label='Undo' onClick={this.onCancel} className='btn todo-card-action'>
								<i className='mdi mdi-undo' />
							</button>
						)}
					</div>
					{this.state.activeClass && (
						<button type='button' aria-label='Save' onClick={this.onClose} className='btn btn-light'>
							Close
						</button>
					)}
				</div>
			</div>
		);
	}
}

CardTodo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(CardTodo);
