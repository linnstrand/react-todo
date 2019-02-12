import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editColor, setColor, deleteTodo, updateTodo, cancelEdit, toggleChecked } from '../../actions';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import './todo.scss';

const mapDispatchToProps = dispatch => {
	return {
		editColor: id => dispatch(editColor(id)),
		deleteTodo: id => dispatch(deleteTodo(id)),
		setColor: (id, hex) => dispatch(setColor({ id, hex })),
		updateTodo: todo => dispatch(updateTodo(todo)),
		toggleChecked: id => dispatch(toggleChecked(id)),
		cancelEdit: () => dispatch(cancelEdit())
	};
};

class CardTodo extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.state = {
			originalTodo: Object.assign({}, this.props.todo),
			activeClass: '',
			isChanged: false
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = e => {
		if (this.state.activeClass && !this.myRef.current.contains(e.target)) {
			this.onClose();
		}
	};

	handleClickInside = () => this.setState({ clickedOutside: false });

	isChanged = todo => todo.name !== this.state.originalTodo.name || todo.content !== this.state.originalTodo.content;

	onClose = () => {
		this.setState({ activeClass: '' });
		this.props.cancelEdit();
	};

	onCancel = () => {
		this.props.updateTodo(this.state.originalTodo);
		this.onClose();
		this.setState({ isChanged: false });
	};

	activateEdit = () => {
		this.setState({ activeClass: ' is-editing' });
	};

	handleChange = (event, field) => {
		let changed = Object.assign({}, this.props.todo);
		changed[field] = event.target.value;
		this.setState({ isChanged: this.isChanged(changed) });
		this.props.updateTodo(changed);
	};

	render() {
		let todo = this.props.todo;
		return (
			<div
				ref={this.myRef}
				className={'todo-card card' + this.state.activeClass + (this.props.checked ? ' is-checked' : '')}
				style={{ backgroundColor: todo.color }}>
				<div
					className={'select-button'}
					role='button'
					aria-label='Check Todo'
					onClick={() => this.props.toggleChecked(this.props.todo.id)}>
					<i className='mdi mdi-check' />
				</div>
				<div className='card-body mb-2' onClick={this.activateEdit}>
					<ContentEditable html={todo.name} className={'card-title h5'} onChange={event => this.handleChange(event, 'name')} />
					{!Array.isArray(todo.content) && (
						<ContentEditable
							html={todo.content}
							className={'card-text'}
							onChange={event => this.handleChange(event, 'content')}
						/>
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
						<label className='btn todo-card-action'>
							<i className='mdi mdi-brush' />
							<input
								className='d-none'
								name={'colorEdit' + todo.id}
								id={'colorEdit' + todo.id}
								type='color'
								value={todo.color || '#FFFFFF'}
								onChange={event => this.props.setColor(todo.id, event.target.value)}
							/>
						</label>

						<button
							type='button'
							aria-label='Delete'
							onClick={() => this.props.deleteTodo(todo.id)}
							className='btn todo-card-action'>
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
