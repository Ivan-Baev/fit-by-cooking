import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import * as AuthService from '../../services/authService';
import Login from '../Login/Login';

export default function Header() {
	const { user } = useContext(AuthContext);

	const { addNotification } = useNotificationContext();

	let userNavigation = (
		<div>
			<Dropdown as={ButtonGroup}>
				<Button variant="secondary">Welcome, {user.username}</Button>

				<Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

				<Dropdown.Menu style={{ margin: 0 }}>
					<Dropdown.Item as={Link} to={`/user/${user._id}`}>
						My Profile
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="/my-recipes">
						My Recipes
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="/create-recipe">
						Create Recipe
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={logout} href="/">
						Logout
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);

	function logout() {
		addNotification('You logged out successfully!', types.info);
		AuthService.logout(user.accessToken);
	}
	return (
		<header>
			<nav className="custom-navbar navbar navbar-expand-lg navbar-dark fixed-top" data-spy="affix" data-offset-top={10}>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav">
						<li className="nav-item">
							<HashLink smooth className="nav-link" to="/#home">
								Home
							</HashLink>
						</li>
						<li className="nav-item">
							<HashLink smooth className="nav-link" to="/#top-choices">
								Top choices
							</HashLink>
						</li>
					</ul>
					<HashLink smooth className="navbar-brand m-auto" to="/#home">
						<img src="assets/imgs/logo5.svg" className="brand-img" alt="" />
						<span className="brand-txt">Fit by Cooking</span>
					</HashLink>
					<ul className="navbar-nav">
						<li className="nav-item">
							<HashLink smooth className="nav-link" to="/cookbook/#">
								Anabolic cookbook<span className="sr-only">(current)</span>
							</HashLink>
						</li>
						<li className="nav-item">
							<HashLink smooth className="nav-link" to="/#contact">
								Contact Us
							</HashLink>
						</li>
						{user.email ? userNavigation : <Login />}
					</ul>
				</div>
			</nav>
		</header>
	);
}
