import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index';
import ContentEditable from 'react-contenteditable';
import { setBullet, cleanTodo } from './todoService';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: todo => dispatch(addTodo(todo))
	};
};

class TodoNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: { title: '', content: '' }
		};
	}

	onSave = () => {
		const todo = cleanTodo(this.state.newTodo);
		this.props.addTodo(todo);
		this.onCancel();
	};

	onCancel = () => {
		this.setState({ newTodo: {} });
	};

	handleChange = (event, field) => {
		let changed = Object.assign({}, this.state.newTodo);
		changed[field] = event.target.value;
		this.setState({ newTodo: changed });
	};

	toggleBullets = () => {
		let todo = setBullet(this.state.newTodo);
		this.setState({ newTodo: todo });
	};

	render() {
		return (
			<div className='d-inline-flex card todo-card new-todo-card'>
				<div className='new-todo-body'>
					<div className='new-todo-title new-todo-text'>
						{!this.state.newTodo.name && <div className='position-absolute new-todo-text todo-placeholder'>Title</div>}
						<ContentEditable
							html={this.state.newTodo.name || ''}
							className={'new-todo-text new-todo-title'}
							onChange={event => this.handleChange(event, 'name')}
						/>
					</div>
					<div className='new-todo-text'>
						{!this.state.newTodo.content && (
							<div className='position-absolute new-todo-text todo-placeholder'>Write a note!</div>
						)}
						<ContentEditable
							html={this.state.newTodo.content || ''}
							className={'new-todo-text new-todo-content'}
							onChange={event => this.handleChange(event, 'content')}
						/>
					</div>
				</div>
				<div className='new-todo-menu'>
					{(this.state.newTodo.content || this.state.newTodo.content) && (
						<React.Fragment>
							<button
								type='button'
								aria-label='Bullet Points'
								onClick={this.toggleBullets}
								className={'todo-card-action' + (this.state.hasBullets ? ' bullets-active' : '')}>
								<i className='mdi mdi-format-list-bulleted' />
							</button>
							<button aria-label='Discard' className='btn todo-icon-button' onClick={this.onCancel}>
								<i className='mdi mdi-delete' />
							</button>
							<button aria-label='Save' className='btn todo-icon-button' onClick={this.onSave}>
								<i className='mdi mdi-content-save' />
							</button>
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoNew);
