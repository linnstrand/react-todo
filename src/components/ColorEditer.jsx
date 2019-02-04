import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

class ColorEditer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { color: props.editState.color || '#FFFFFF' };
	}

	onChange = event => {
		this.setState({ color: event.target.value });
	};

	render() {
		const editState = this.props.editState;
		const { color } = this.state;
		return (
			<Modal show={editState.editing}>
				<Modal.Header closeButton onHide={editState.cancelEdit}>
					<Modal.Title>Color</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form onSubmit={e => e.preventDefault}>
						<label>Edit Color of {editState.name}</label>
						<input type='color' value={color} onChange={this.onChange} />
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.props.cancelEdit} variant='secondary'>
						Close
					</Button>
					<Button onClick={() => this.props.saveEdit(editState.name, color)} variant='primary'>
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

ColorEditer.propTypes = {
	cancelEdit: PropTypes.func,
	saveEdit: PropTypes.func,
	editState: PropTypes.object
};
export default ColorEditer;
