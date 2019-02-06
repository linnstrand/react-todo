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

	render() {
		return (
			<React.Fragment>
				{!this.state.value && <div className='position-absolute new-todo-text'>{this.props.placeholder}</div>}
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					className='new-todo-text'
					onInput={this.emitChange}
					onBlur={this.emitChange}
					ref={this.inputRef}
				/>
			</React.Fragment>
		);
	}

	static propTypes = {
		todoInput: PropTypes.string.Required,
		placeholder: PropTypes.string,
		onChange: PropTypes.func.Required
	};
}
