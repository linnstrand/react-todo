import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import './todo.scss';
import { setBullet } from './todoService';
import { ColorOptions } from './ColorOptions';
import { CheckButton } from './CheckButton';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			originalTodo: Object.assign({}, this.props.todo),
			isChanged: false,
			visibleColor: false
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = e => {
		if (this.props.isActive && !this.myRef.current.contains(e.target)) {
			this.onDone();
		}
	};

	isChanged = todo => todo.name !== this.state.originalTodo.name || todo.content !== this.state.originalTodo.content;

	onDone = () => {
		this.props.editingCancel();
		this.props.doneTodo();
		this.setState({ isChanged: false });
	};

	onCancel = () => {
		this.updateTodo(this.state.originalTodo);
		this.onDone();
	};

	handleChange = (event, field) => {
		let changed = Object.assign({}, this.props.todo);
		changed[field] = event.target.value;
		this.updateTodo(changed);
	};

	updateTodo(changed) {
		changed.hasBullets = changed.content.includes('<li>');
		this.setState({ isChanged: this.isChanged(changed) });
		this.props.updateTodo(changed);
	}

	toggleBullets = () => {
		let todo = setBullet(this.props.todo);
		this.updateTodo(todo);
	};

	render() {
		let todo = this.props.todo;
		return (
			<div
				ref={this.myRef}
				className={`todo-card card' ${this.props.isActive ? ' is-editing' : ''}${this.props.checked ? ' is-checked' : ''}`}
				style={{ backgroundColor: todo.color || '#fff' }}
				onMouseLeave={() => this.setState({ visibleColor: false })}>
				<CheckButton editingToggle={this.props.editingToggle} id={this.props.todo.id} />
				<div className='card-body' onClick={() => this.props.editingStart(todo.id)}>
					<ContentEditable
						html={todo.name || ''}
						className={'card-title h5'}
						onChange={event => this.handleChange(event, 'name')}
					/>
					<ContentEditable html={todo.content} className={'card-text'} onChange={event => this.handleChange(event, 'content')} />
				</div>
				<div className='card-footer'>
					<div className='d-inline-flex'>
						<button type='button' className='todo-card-action' onMouseEnter={() => this.setState({ visibleColor: true })}>
							<i className='mdi mdi-brush' />
						</button>
						<button
							type='button'
							aria-label='Bullet Points'
							onClick={this.toggleBullets}
							className={'todo-card-action' + (todo.hasBullets ? ' bullets-active' : '')}>
							<i className='mdi mdi-format-list-bulleted' />
						</button>
						<button
							type='button'
							aria-label='Delete'
							onClick={() => this.props.deleteTodo(todo.id)}
							className='btn todo-card-action'>
							<i className='mdi mdi-delete' />
						</button>
						{this.state.isChanged && (
							<button type='button' aria-label='Undo' onClick={this.onCancel} className='todo-card-action'>
								<i className='mdi mdi-undo' />
							</button>
						)}
					</div>
					{this.props.isActive && (
						<button type='button' aria-label='Save' onClick={this.onDone} className='btn btn-light'>
							Close
						</button>
					)}
				</div>
				<ColorOptions visibleColor={this.state.visibleColor} setColor={this.props.setColor} id={todo.id} />
			</div>
		);
	}
}

Todo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default Todo;
