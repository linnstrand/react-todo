import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index';
import TodoInput from './TodoInput';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: name => dispatch(addTodo(name))
	};
};

class TodoNew extends React.Component {
	lastTitle = '';
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			content: ''
		};
	}

	saveTodo = e => {
		e.preventDefault();
		this.props.addTodo(this.state);
		this.setState({
			name: '',
			content: ''
		});
	};
	cancelTodo = () => {
		console.log();
	};
	onChange = (name, value) => {
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div className='d-inline-flex card todo-card new-todo-card'>
				<div className='new-todo-title new-todo-text'>
					<TodoInput
						name={'name'}
						todoInput={this.state.name}
						placeholder={'Title'}
						onChange={(name, value) => this.onChange(name, value)}
					/>
				</div>
				<div className='new-todo-text'>
					<TodoInput
						name={'content'}
						todoInput={this.state.content}
						placeholder={'Write a note!'}
						onChange={(name, value) => this.onChange(name, value)}
					/>
				</div>

				{this.state.name &&
					(this.state.content && (
						<div className='card-footer'>
							<button aria-label='Color' onClick={event => this.saveTodo(event)} className='btn todo-card-action'>
								<i className='mdi mdi-content-save' />
							</button>
							<button aria-label='Delete' onClick={() => this.cancelTodo()} className='btn todo-card-action'>
								<i className='mdi mdi-delete' />
							</button>
						</div>
					))}
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoNew);
