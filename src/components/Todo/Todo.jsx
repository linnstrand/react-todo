import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editColor, setColor, deleteTodo, updateTodo, cancelEdit, toggleChecked } from '../../actions';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import './todo.scss';
import { setBullet } from './todoService';
import { COLORS } from '../../constants/colors';

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
		if (this.state.activeClass && !this.myRef.current.contains(e.target)) {
			this.onClose();
		}
	};

	handleClickInside = () => this.setState({ clickedOutside: false });

	isChanged = todo => todo.name !== this.state.originalTodo.name || todo.content !== this.state.originalTodo.content;

	onClose = () => {
		this.setState({ activeClass: '' });
		this.props.cancelEdit();
		this.setState({ isChanged: false });
	};

	onCancel = () => {
		this.changeUpdates(this.state.originalTodo);
		this.onClose();
	};

	activateEdit = () => {
		this.setState({ activeClass: ' is-editing' });
	};

	handleChange = (event, field) => {
		let changed = Object.assign({}, this.props.todo);
		changed[field] = event.target.value;
		this.changeUpdates(changed);
	};

	changeUpdates(changed) {
		changed.hasBullets = changed.content.includes('<li>');
		this.setState({ isChanged: this.isChanged(changed) });
		this.props.updateTodo(changed);
	}

	toggleBullets = () => {
		let todo = setBullet(this.props.todo);
		this.changeUpdates(todo);
	};

	render() {
		let todo = this.props.todo;
		return (
			<div
				ref={this.myRef}
				className={'todo-card card' + this.state.activeClass + (this.props.checked ? ' is-checked' : '')}
				style={{ backgroundColor: todo.color }}
				onMouseLeave={() => this.setState({ visibleColor: false })}>
				<div
					className={'select-button'}
					role='button'
					aria-label='Check Todo'
					onClick={() => this.props.toggleChecked(this.props.todo.id)}>
					<i className='mdi mdi-check' />
				</div>
				<div className='card-body' onClick={this.activateEdit}>
					<ContentEditable html={todo.name} className={'card-title h5'} onChange={event => this.handleChange(event, 'name')} />
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
					{this.state.activeClass && (
						<button type='button' aria-label='Save' onClick={this.onClose} className='btn btn-light'>
							Close
						</button>
					)}
				</div>
				<div className={'shadow-sm color-options ' + (this.state.visibleColor ? 'shown' : '')}>
					{COLORS.map(color => {
						const styling = {
							borderColor: color.hex,
							backgroundColor: color.hex
						};
						return (
							<button
								key={color.hex}
								className='color-button'
								title={color.name}
								style={styling}
								onClick={() => this.props.setColor(todo.id, color.hex)}
								aria-label={color.name}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

CardTodo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(CardTodo);
