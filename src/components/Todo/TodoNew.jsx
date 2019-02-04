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
			<div className='d-inline-flex'>
				<form className='todo-card card'>
					<div className='card-body'>
						<input
							type='text'
							name='title'
							id='title'
							className='card-title h5 mb-0 d-block'
							autoComplete='off'
							placeholder='Note title'
							onChange={this.onChange}
						/>
						<textarea
							name='content'
							id='content'
							cols='30'
							rows='3'
							className='card-text card-editable'
							placeholder='Write a note!'
							onChange={this.onChange}
						/>
					</div>
					<div className='card-footer'>
						<button aria-label='Color' onClick={event => this.saveTodo(event)} className='btn todo-card-action'>
							<i className='mdi mdi-content-save' />
						</button>
						<button aria-label='Delete' onClick={() => this.cancelTodo()} className='btn todo-card-action'>
							<i className='mdi mdi-delete' />
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoNew);
