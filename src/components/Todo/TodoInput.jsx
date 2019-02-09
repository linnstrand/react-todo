import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoInput extends Component {
	inputRef = React.createRef();

	emitChange = () => {
		const text = this.inputRef.current.innerHtml;
		this.props.onChange(this.props.name, text);
	};

	emitBlur = () => {
		this.props.onBlur(this.props.name);
	};

	render() {
		return (
			<React.Fragment>
				<div
					role='textbox'
					contentEditable='true'
					suppressContentEditableWarning='true'
					aria-multiline='true'
					className={this.props.stylingClasses}
					onInput={this.emitChange}
					onBlur={this.emitBlur}
					ref={this.inputRef}>
					{this.props.todoInput}
				</div>
			</React.Fragment>
		);
	}

	static propTypes = {
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired
	};
}
