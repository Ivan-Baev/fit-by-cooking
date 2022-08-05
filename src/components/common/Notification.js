import { Toast, ToastContainer } from 'react-bootstrap';
import { useNotificationContext } from '../../contexts/NotificationContext';
import './Notification.css';

const Notification = () => {
	const { notification, hideNotification } = useNotificationContext();

	if (!notification.show) {
		return null;
	}

	return (
		<div aria-live="polite" aria-atomic="true" className="bg-dark position-relative">
			<ToastContainer position="top-end" className="p-3">
				<Toast className="notification d-inline-block m-1" bg={notification.type} onClose={hideNotification}>
					<Toast.Body>{notification.message}</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
};

export default Notification;
