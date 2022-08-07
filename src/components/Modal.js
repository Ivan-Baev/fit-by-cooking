import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onClose, onSave }) => {
	return (
		<Modal style={{ borderRadius: '15px' }} show={show} onHide={onClose}>
			<Modal.Header>
				<Modal.Title className="text-dark">Confirm delete?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-dark">Are you sure you want to delete this recipe?</Modal.Body>
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
