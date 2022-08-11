import { useNavigate } from 'react-router';
import './Register.css';
import * as authService from '../../services/authService';
import { useContext } from 'react';
import { useState } from 'react';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { AuthContext } from '../../contexts/AuthContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Register() {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const { addNotification } = useNotificationContext();

	const [validated, setValidated] = useState(false);

	const registerHandler = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			e.preventDefault();
		}

		setValidated(true);

		if (form.checkValidity() === true) {
			e.preventDefault();
			let { username, email, password } = Object.fromEntries(new FormData(e.currentTarget));

			authService
				.register(email, password, username)
				.then((authData) => {
					login(authData);
					addNotification('You logged in successfully!', types.success);
					navigate('/');
				})
				.catch((error) => {
					console.log(error);
					addNotification('Invalid registration!', types.error);
				});
		}
		e.preventDefault();
	};
	return (
		<div id="contact" className="container-fluid bg-dark text-light border-top wow fadeIn slow ">
			<article id="home" className="header">
				<div className="overlay text-white text-center">
					<div className="container">
						<h3>Create an account</h3>
						<div className="box">
							<Form noValidate validated={validated} method="POST" onSubmit={registerHandler} className="px-3 py-3">
								<Form.Group className="mb-3" controlId="formBasicUsername">
									<Form.Label style={{ color: 'white' }}>Username</Form.Label>
									<InputGroup hasValidation>
										<Form.Control required name="username" type="text" placeholder="Enter username" />
										<Form.Control.Feedback type="invalid">Please enter a username email.</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label style={{ color: 'white' }}>Email address</Form.Label>
									<InputGroup hasValidation>
										<Form.Control required name="email" type="email" placeholder="Enter email" aria-describedby="inputGroupPrepend" />
										<Form.Control.Feedback type="invalid">Please use a valid email.</Form.Control.Feedback>
									</InputGroup>
									<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label style={{ color: 'white' }}>Password</Form.Label>
									<InputGroup hasValidation>
										<Form.Control required name="password" type="password" placeholder="Password" />
										<Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>

								<Button variant="primary" type="submit">
									Sign up
								</Button>
							</Form>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
