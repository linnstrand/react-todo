import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: name => dispatch(addTodo(name))
	};
};

class TodoNew extends React.Component {
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
	};
	cancelTodo = () => {
		console.log();
	};
	onChange = event => {
		const key = event.target.id;
		const value = event.target.value;
		switch (key) {
			case 'title':
				this.setState({ name: value });
				break;
			case 'content':
				this.setState({ content: value });
				break;
			default:
				break;
		}
	};

	render() {
		return (
			<div className='d-inline-flex card todo-card new-todo-card'>
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					id='title'
					className='new-todo-title'
					onChange={this.onChange}>
					Title
				</div>
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					id='content'
					className='new-todo-content'
					onChange={this.onChange}>
					Write a note!
				</div>
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
