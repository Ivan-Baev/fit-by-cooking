import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import * as authService from '../../services/authService';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Login() {
	const { login } = useContext(AuthContext);
	const { addNotification } = useNotificationContext();

	const [validated, setValidated] = useState(false);

	function loginHandler(e) {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			e.preventDefault();
		}

		setValidated(true);

		if (form.checkValidity() === true) {
			e.preventDefault();
			let formData = new FormData(e.currentTarget);
			let email = formData.get('email');
			let password = formData.get('password');

			authService
				.login(email, password)
				.then((authData) => {
					login(authData);
					addNotification('You logged in successfully!', types.success);
				})
				.catch((err) => {
					console.log(err);
					addNotification('Invalid login!', types.error);
				});
		}
	}
	return (
		<Dropdown className="d-inline mx-2" autoClose="inside">
			<Dropdown.Toggle id="dropdown-autoclose-inside">Sign in</Dropdown.Toggle>
			<Dropdown.Menu style={{ margin: 0 }}>
				<Form noValidate validated={validated} method="POST" onSubmit={loginHandler} className="px-4 py-3">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label style={{ color: 'black' }}>Email address</Form.Label>
						<InputGroup hasValidation>
							<Form.Control required name="email" type="email" placeholder="Enter email" aria-describedby="inputGroupPrepend" />
							<Form.Control.Feedback type="invalid">Please use a valid email.</Form.Control.Feedback>
						</InputGroup>
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label style={{ color: 'black' }}>Password</Form.Label>
						<InputGroup hasValidation>
							<Form.Control required name="password" type="password" placeholder="Password" />
							<Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<div className="dropdown-divider"></div>
				<a className="dropdown-item" href="#">
					<small>New around here? Sign up</small>
				</a>
				<a className="dropdown-item" href="#">
					<small>Forgot password?</small>
				</a>
			</Dropdown.Menu>
		</Dropdown>
	);
}
