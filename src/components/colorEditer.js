import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


const ColorEditer = ({editState}) => (
    <Modal show={editState.editing}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Color of {editState.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
        </Modal.Footer>
    </Modal>
)


export default ColorEditer;

