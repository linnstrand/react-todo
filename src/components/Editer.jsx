import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

class Editer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: props.name, content: props.content };
	}

	handleChange = event => {
		this.setState({ color: event.target.value });
	};

	render() {
		const editState = this.props.editState;
		return (
			<Modal show={editState.editing}>
				<Modal.Header closeButton onHide={editState.cancelEdit}>
					<Modal.Title>Color</Modal.Title>
				</Modal.Header>

				<Modal.Body />

				<Modal.Footer>
					<Button onClick={this.props.cancelEdit} variant='secondary'>
						Close
					</Button>
					<Button onClick={() => this.props.saveEdit(editState)} variant='primary'>
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

Editer.propTypes = {
	cancelEdit: PropTypes.func,
	saveEdit: PropTypes.func,
	editState: PropTypes.object
};
export default Editer;
