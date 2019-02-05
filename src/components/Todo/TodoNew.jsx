import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index';

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
			content: '',
		};
		this.titleInput = React.createRef();
	}

	saveTodo = e => {
		e.preventDefault();
		this.props.addTodo(this.state);
	};
	cancelTodo = () => {
		console.log();
	};

	emitChange = () => {
		const text = this.titleInput.current.textContent;
		if (text !== this.state.name) {
			this.setState({ name: text });
		}
	};

	render() {
		return (
			<div className='d-inline-flex card todo-card new-todo-card'>
				{/* {!this.state.name && <div className='position-absolute new-todo-text'>Title</div>} */}
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					id='title'
					className='new-todo-title new-todo-text'
					onInput={this.emitChange}
					onBlur={this.emitChange}
					ref={this.titleInput}
				/>
				{!this.state.content && <div className='position-absolute stuck-bottom new-todo-text'>Write a note!</div>}
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					id='content'
					className='new-todo-content new-todo-text'
				/>
				{this.state.name ||
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
