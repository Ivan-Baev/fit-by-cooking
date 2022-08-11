import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import * as recipeService from '../../services/recipeService';
import * as favoriteService from '../../services/favoriteService';

import { Link } from 'react-router-dom';

import './UserProfile.css';
import UserProfileRecipeCard from './UserProfileRecipeCard';
import Button from 'react-bootstrap/esm/Button';

function UserProfile() {
	const { user } = useContext(AuthContext);

	const [recipes, setRecipes] = useState([]);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		recipeService
			.getRecipesByOwnerId(user._id)
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				const recipesData = Object.values(result);
				setRecipes(recipesData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user._id]);

	useEffect(() => {
		favoriteService
			.getAllFavoritedByUserId(user._id)
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				let favorited = [];
				result.forEach((item) => favorited.push(item.recipes));
				setFavorites(favorited);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user._id]);

	return (
		<>
			<div id="gallery" style={{ marginTop: '1px', paddingTop: '200px' }} className="overlay text-light has-height-md middle-items wow fadeIn">
				<div className="row py-5">
					<div className="col-md-5 mx-auto">
						<div className="bg-white shadow rounded overflow-hidden">
							<div className="pt-0 pb-4 cover">
								<h2 className="mb-0 mt-0 pt-4 text-center profile-head"> Welcome to your profile</h2>
								<div className="media align-items-end profile-head">
									<div className="profile mr-3">
										<img
											src="https://media.istockphoto.com/photos/3d-strong-man-lifts-a-big-metal-barbell-picture-id1372945797?k=20&m=1372945797&s=612x612&w=0&h=pbU8vFGIXeowV2i0dvk7sW_Od67l_CY4cGWv6ueo1Ck="
											alt="..."
											width={130}
											className="rounded mb-2 img-thumbnail"
										/>
									</div>
									<div className="media-body mb-5 text-white">
										<h4 className="mt-0 mb-0"> {user.username}</h4>
									</div>
								</div>
							</div>
							<div className="bg-light p-4 d-flex text-center justify-content-between text-dark align-items-center">
								<Button as={Link} to="/create-recipe" variant="primary" style={{ marginLeft: 300 }}>
									Create recipe!
								</Button>
								<ul className="list-inline mb-0 mr-2">
									<li className="list-inline-item ml-2">
										<h5 className="font-weight-bold mb-0 d-block">{recipes.length}</h5>
										<small className="text-muted">
											<i className="fas fa-image mr-1" />
											Recipes
										</small>
									</li>
									<li className="list-inline-item">
										<h5 className="font-weight-bold mb-0 d-block">{favorites.length}</h5>
										<small className="text-muted">
											<i className="fas fa-user mr-1" />
											Favorites
										</small>
									</li>
								</ul>
							</div>

							<div className="bg-dark p-2">
								<div className="d-flex align-items-center justify-content-between p-3 ">
									<div>
										<ul className="nav nav-pills nav-justified" style={{ width: '300px' }} id="pills-tab" role="tablist">
											<li className="nav-item">
												<a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#breakfast" role="tab" aria-controls="pills-home" aria-selected="true">
													Own Recipes
												</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#meals" role="tab" aria-controls="pills-profile" aria-selected="false">
													Favorites
												</a>
											</li>
										</ul>
									</div>
									<div>
										<Link to="/cookbook" className="btn btn-link text-muted">
											Show all
										</Link>
									</div>
								</div>
								<div className="row p-2">
									<div className="w-100 mb-2 pr-lg-2">
										<div className="tab-content " id="pills-tabContent">
											<div className="tab-pane fade show active" id="breakfast" role="tabpanel" aria-labelledby="pills-home-tab">
												<div className="row justify-content-center">
													{recipes && recipes.length > 0 ? (
														recipes.map((x) => <UserProfileRecipeCard key={x._id} recipe={x} />)
													) : (
														<h2 style={{ margin: '40 auto' }}>You haven't posted any recieps yet!</h2>
													)}
												</div>
											</div>
											<div className="tab-pane fade" id="meals" role="tabpanel" aria-labelledby="pills-profile-tab">
												<div className="row justify-content-center">
													{favorites && favorites.length > 0 ? (
														favorites.map((x) => <UserProfileRecipeCard key={x._id} recipe={x} />)
													) : (
														<h4 style={{ margin: '40 auto' }}>You haven't added anything in your favorites list yet!</h4>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserProfile;
