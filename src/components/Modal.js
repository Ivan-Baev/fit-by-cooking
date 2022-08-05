import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onClose, onSave }) => {
	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm deleting Recipe</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>Are you sure you want to delete this recipe?</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="primary" onClick={onSave}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmModal;
