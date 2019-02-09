import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo } from '../../actions/index';
import TodoInput from './TodoInput';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: name => dispatch(addTodo(name)),
		updateTodo: name => dispatch(updateTodo(name))
	};
};

class TodoNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todo: {},
			newTodo: {}
		};
	}

	cancelTodo = () => {
		this.setState({ todo: {} });
	};

	onBlur = () => {
		this.setState({ todo: Object.assign({}, this.state.todo) });
		this.state.todo.id ? updateTodo(this.state.todo) : addTodo(this.state.todo);
	};
	onChange = (name, value) => {
		let t = Object.assign({}, this.state.todo);
		t[name] = value;
		this.setState({ newTodo: t });
	};

	render() {
		return (
			<div className='d-inline-flex card todo-card new-todo-card'>
				<div className='new-todo-body'>
					<div className='new-todo-title new-todo-text'>
						{!this.state.newTodo.name && <div className='position-absolute new-todo-text todo-placeholder'>Title</div>}
						<TodoInput
							name={'name'}
							todoInput={this.state.todo.name}
							stylingClasses={'new-todo-text new-todo-title'}
							onChange={(name, value) => this.onChange(name, value)}
							onBlur={(name, value) => this.onBlur(name, value)}
						/>
					</div>
					<div className='new-todo-text'>
						{!this.state.newTodo.content && (
							<div className='position-absolute new-todo-text todo-placeholder'>Write a note!</div>
						)}
						<TodoInput
							name={'content'}
							todoInput={this.state.todo.content}
							stylingClasses={'new-todo-text new-todo-content'}
							onChange={(name, value) => this.onChange(name, value)}
							onBlur={() => this.onBlur()}
						/>
					</div>
				</div>
				{this.state.todo.content && (
					<div className='new-todo-menu'>
						<button aria-label='Discard' className='btn todo-icon-button' onCLick={this.cancelTodo}>
							<i className='mdi mdi-delete' />
						</button>
						<button aria-label='Save' className='btn todo-icon-button'>
							<i className='mdi mdi-content-save' />
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoNew);
