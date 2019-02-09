import React from 'react';
import { saveEdit, cancelEdit } from '../actions';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const mapStateToProps = state => ({
	editing: state.editing
});

const mapDispatchToProps = dispatch => {
	return {
		saveEdit: a => dispatch(saveEdit(a)),
		cancelEdit: () => dispatch(cancelEdit())
	};
};

const Editer = ({ editing, cancelEdit, saveEdit }) => {
	const todo = editing.target;
	return (
		<div>
			<Modal isOpen={editing.on}>
				<ModalHeader toggle={cancelEdit}>
					<div className='card-title h5' contentEditable='true' suppressContentEditableWarning='true'>
						{todo.name}
					</div>
				</ModalHeader>
				<ModalBody>
					<div
						role='textbox'
						contentEditable='true'
						suppressContentEditableWarning='true'
						aria-multiline='true'
						className='card-text card-editable'>
						{todo.content}
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={() => saveEdit(todo)}>
						Save
					</Button>{' '}
					<Button color='secondary' onClick={cancelEdit}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Editer);
