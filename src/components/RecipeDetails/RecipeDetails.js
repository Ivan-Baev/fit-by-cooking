import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as recipeService from '../../services/recipeService';
import ConfirmModal from '../common/Modal';
import './RecipeDetails.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import CommentSection from '..//CommentSection/CommentsList';
import * as favoriteService from '../../services/favoriteService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

export default function Details() {
	const { user } = useContext(AuthContext);
	const { addNotification } = useNotificationContext();
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [flag, setFlag] = useState(false);
	const [favorite, setFavorite] = useState({});
	const [confirm, setConfirm] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		recipeService
			.getRecipeById(recipeId)
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				setRecipe(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [recipeId]);

	useEffect(() => {
		favoriteService
			.getOneFavoritedByUserId(recipeId, user._id)
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				setFavorite(result[0]);

				if (result.length > 0) {
					setFlag(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [recipeId, user._id]);

	console.log(favorite);

	const confirmDelete = (e) => {
		e.preventDefault();
		setConfirm(true);
	};

	const onDeleteHandler = (e) => {
		e.preventDefault();
		recipeService
			.deleteRecipe(recipeId, user.accessToken)
			.then(() => {
				navigate(-1);
			})
			.finally(() => setConfirm(false));
	};

	const ownerButtons = (
		<div id="ownerButtons" className="gallary-item wow fadeIn">
			<span className="mr-2" style={{ alignSelf: 'center' }}>
				Controls:
			</span>
			<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit post!</Tooltip>}>
				<Link to={`/cookbook/${recipe._id}/edit`}>
					<i className="fas fa-edit fa-3x" style={{ color: 'green' }}></i>
				</Link>
			</OverlayTrigger>
			<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete post!</Tooltip>}>
				<span id="clickableSpan" onClick={confirmDelete}>
					<i className="fas fa-ban fa-2x" style={{ color: 'red' }}></i>
				</span>
			</OverlayTrigger>
		</div>
	);

	const FavoriteHandler = (e) => {
		e.preventDefault();
		setFlag(!flag);
		if (flag !== true) {
			favoriteService.addToFavorites(recipe._id, user._id, user.accessToken).then((result) => {
				setFavorite(result);
			});

			addNotification('Successfully added to favorites!', types.success);
		} else {
			favoriteService.removeFromFavorites(favorite._id, user.accessToken);
			addNotification('Successfully removed from favorites!', types.danger);
		}
	};

	return (
		<>
			<section className="single-post has-bg-overlay ">
				<ConfirmModal show={confirm} onClose={() => setConfirm(false)} onSave={onDeleteHandler} />
				<div id="recipe-post" className="container-sm text-dark bg-light bg-opacity-25 wow fadeIn">
					<div className="row d-flex justify-content-center">
						<div className="col-lg-8">
							<div className="single-post__title">
								<div className="single-post__title__meta">
									{user._id && user._id === recipe._ownerId ? ownerButtons : ''}

									<h2>{new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(recipe._createdOn)}</h2>
									<span>{new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(recipe._createdOn)}</span>
								</div>
								<div className="single-post__title__text">
									<ul className="label">
										<li>{recipe.category}</li>
									</ul>
									<h3>{recipe.title}</h3>
									<ul className="widget">
										<li>By {recipe.author}</li>
										<li>3 min read</li>
									</ul>
								</div>
							</div>
							<div className="single-post__social__item">
								<p>
									<u>Per serving:</u>
								</p>
								<ul>
									Calories:<li>{Math.round(recipe.calories / recipe.servings, 0)} kcal</li>
									Protein:<li>{Math.round(recipe.protein / recipe.servings, 0)}g</li>
									Carbs:<li>{Math.round(recipe.carbs / recipe.servings, 0)}g</li>
									Fat:<li>{Math.round(recipe.fat / recipe.servings, 0)}g</li>
								</ul>
							</div>
							{user._id ? (
								<div className="single-post__social__item right">
									<h5>Save in favorites</h5>
									{!flag && (
										<div className="gallary-item wow fadeIn">
											<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add to favorites!</Tooltip>}>
												<div onClick={FavoriteHandler}>
													<i className="far fa-heart fa-4x" style={{ color: 'blue' }}></i>
												</div>
											</OverlayTrigger>
										</div>
									)}
									{flag && (
										<div className="gallary-item wow fadeIn">
											<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove from favorites!</Tooltip>}>
												<div onClick={FavoriteHandler}>
													<i className="fas fa-heart fa-4x" style={{ color: 'blue' }}></i>
												</div>
											</OverlayTrigger>
										</div>
									)}
								</div>
							) : (
								''
							)}

							<div className="single-post__top__text">
								<p>{recipe.description}</p>
							</div>
							<div className="single-post__recipe__details">
								<div className="single-post__recipe__details__option">
									<ul>
										<li>
											<h5>
												<i className="fa fa-user" /> SERVINGS
											</h5>
											<span>{recipe.servings} serving</span>
										</li>
										<li>
											<h5>
												<i className="fa fa-clock" /> PREP TIME
											</h5>
											<span>{recipe.prepTime} minutes</span>
										</li>
										<li>
											<h5>
												<i className="fa fa-clock" /> Cook TIME
											</h5>
											<span>{recipe.cookingTime} minutes</span>
										</li>
									</ul>
								</div>
								<div className="single-post__recipe__details__indegradients">
									<h5>Ingredients</h5>
									<ul>
										{recipe.ingredients?.map((item) => (
											<li key={item.identifier}>
												{item.weight}g {item.ingredient}
											</li>
										))}
									</ul>
								</div>
								<div className="single-post__recipe__details__direction">
									<h5>Directions</h5>
									<ul>
										{recipe.instructions?.map((item, index) => (
											<li key={item.identifier}>
												<span> {index + 1}.</span>
												{item.instruction}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="single-post__comment">
								<CommentSection recipeId={recipe._id} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
