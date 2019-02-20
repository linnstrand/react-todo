import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateNew } from '../../actions/index';
import ContentEditable from 'react-contenteditable';
import { setBullet } from './todoService';

const mapDispatchToProps = dispatch => {
	return {
		UpdateNew: todo => dispatch(UpdateNew(todo))
	};
};

class TodoPlaceHolder extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.inputRef.current.focus();
	}

	handleChange = event => {
		let todo = Object.assign({}, this.props.newTodo);
		todo.content = event.target.value;
		this.props.UpdateNew(todo);
	};

	toggleBullets = () => {
		let todo = setBullet(this.state.newTodo);
		this.props.UpdateNew(todo);
	};

	render() {
		return (
			<div className='d-flex card todo-card new-todo-card'>
				<div className='new-todo-body'>
					<div className='new-todo-text'>
						{!this.props.newTodo.content && (
							<div className='position-absolute new-todo-text todo-placeholder'>Write a note!</div>
						)}
						<ContentEditable
							html={this.props.newTodo.content || ''}
							innerRef={this.inputRef}
							className={'new-todo-text new-todo-content'}
							onChange={event => this.handleChange(event)}
						/>
					</div>
				</div>
				<div className='new-todo-menu'>
					<button type='button' aria-label='Bullet Points' onClick={this.toggleBullets} className={'todo-card-action'}>
						<i className='mdi mdi-format-list-bulleted' />
					</button>
				</div>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(TodoPlaceHolder);
