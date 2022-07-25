import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
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
					<Dropdown.Item as={Link} to={`/profile/${user._id}`}>
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
							<a className="nav-link" href="#home">
								Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#about">
								About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#top-choices">
								Top choices
							</a>
						</li>
					</ul>
					<a className="navbar-brand m-auto" href="#">
						<img src="assets/imgs/logo.svg" className="brand-img" alt="" />
						<span className="brand-txt">Fit by Cooking</span>
					</a>
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link" href="#gallery">
								All recipes<span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#contact">
								Contact Us
							</a>
						</li>
						{user.email ? userNavigation : <Login />}
					</ul>
				</div>
			</nav>
			<article id="home" className="header">
				<div className="overlay text-white text-center">
					<h1 className="display-2 font-weight-bold my-3">Fit by Cooking</h1>
					<h2 className="display-4 mb-5">Feel free to share your favourite ones with us!</h2>
					<div>
						<a className="btn btn-lg btn-primary" href="#top-choices" style={{ marginRight: '10px' }}>
							View our top choices
						</a>
						<a className="btn btn-lg btn-primary" href="#top-choices">
							Share your recipe!
						</a>
					</div>
				</div>
			</article>
		</header>
	);
}
