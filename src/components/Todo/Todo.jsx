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
			isChanged: false,
			hasBullets: false,
			visibleColor: false
		};
	}

	colors = [
		{ name: 'orange', hex: '#ffeed1' },
		{ name: 'pink', hex: '#ffd6e1' },
		{ name: 'purple', hex: '#f3d1ff' },
		{ name: 'yellow', hex: '#fdffd1' },
		{ name: 'green', hex: '#daffd1' },
		{ name: 'teal', hex: '#cdf7f3' },
		{ name: 'blue', hex: '#d1d8ff' },
		{ name: 'blue-grey', hex: '#ced1e0' },
		{ name: 'grey', hex: '#f8f9fa' }
	]

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		this.setState({ hasBullets: this.isBulletList(this.props.todo.content) })
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
		this.setState({ isChanged: this.isChanged(changed), hasBullets: this.isBulletList(changed.content) });
		this.props.updateTodo(changed);
	}

	setBullet = () => {
		let todo = Object.assign({}, this.props.todo);
		let content = this.props.todo.content;
		if (this.isBulletList(content)) {
			content = content.replace(/(<ul>||<\/ul>)+/g, '');
			content = content.replace(/li>+/g, 'div>');
		} else {
			content = content.replace(/div>+/g, 'li>');
			if (!content.startsWith('<li>')) {
				content = `<li>${content}</li>`;
			}
			content = `<ul>${content}</ul>`;
		}
		todo.content = content;
		this.changeUpdates(todo);
	}

	isBulletList(content) {
		return content.includes('<li>');
	}

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
					<ContentEditable
						html={todo.content}
						className={'card-text'}
						onChange={event => this.handleChange(event, 'content')}
					/>
				</div>
				<div className='card-footer'>
					<div className='d-inline-flex'>
						<button type="button" className='todo-card-action' onClick={() => this.setState({ visibleColor: !this.state.visibleColor })}>
							<i className='mdi mdi-brush' />
						</button>
						<button type='button' aria-label='Bullet Points' onClick={this.setBullet} className={'todo-card-action' + (this.state.hasBullets ? ' bullets-active' : '')}>
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
				<div className={'shadow-sm color-options ' + (this.state.visibleColor ? 'visible' : 'invisible')}>
					{this.colors.map(color => {
						const styling = {
							borderColor: color.hex,
							backgroundColor: color.hex
						}
						return (
							<button key={color.hex} className="color-button" title={color.name} style={styling} onClick={() => this.props.setColor(todo.id, color.hex)} aria-label={color.name}>
							</button>
						)
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
