import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/index';
import ContentEditable from 'react-contenteditable';
import { setBullet } from './todoService';

const mapDispatchToProps = dispatch => {
	return {
		addTodo: todo => dispatch(addTodo(todo))
	};
};

class TodoNew extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
		this.state = {
			newTodo: { title: '', content: '' }
		};
	}

	componentDidMount() {
		this.inputRef.current.focus();
	}

	handleChange = event => {
		let changed = Object.assign({}, this.state.newTodo);
		changed.content = event.target.value;
		this.setState({ newTodo: changed });
	};

	toggleBullets = () => {
		let todo = setBullet(this.state.newTodo);
		this.setState({ newTodo: todo });
	};

	render() {
		return (
			<div className='d-flex card todo-card new-todo-card'>
				<div className='new-todo-body'>
					<div className='new-todo-text'>
						{!this.state.newTodo.content && (
							<div className='position-absolute new-todo-text todo-placeholder'>Write a note!</div>
						)}
						<ContentEditable
							html={this.state.newTodo.content || ''}
							innerRef={this.inputRef}
							className={'new-todo-text new-todo-content'}
							onChange={event => this.handleChange(event)}
						/>
					</div>
				</div>
				<div className='new-todo-menu'>
					<button
						type='button'
						aria-label='Bullet Points'
						onClick={this.toggleBullets}
						className={'todo-card-action' + (this.state.hasBullets ? ' bullets-active' : '')}>
						<i className='mdi mdi-format-list-bulleted' />
					</button>
				</div>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoNew);
