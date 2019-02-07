import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.todoInput
		};
		this.inputRef = React.createRef();
	}

	emitChange = () => {
		const text = this.inputRef.current.textContent;
		if (text !== this.state.value) {
			this.setState({ value: text });
			this.props.onChange(this.props.name, text);
		}
	};

	emitBlur = () => {
		this.props.onBlur(this.props.name);
	};

	render() {
		return (
			<React.Fragment>
				{!this.state.value && <div className='position-absolute new-todo-text todo-placeholder'>{this.props.placeholder}</div>}
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					className='new-todo-text new-todo-content'
					onInput={this.emitChange}
					onBlur={this.emitBlur}
					ref={this.inputRef}
				/>
			</React.Fragment>
		);
	}

	static propTypes = {
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired
	};
}
