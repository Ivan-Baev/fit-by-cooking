import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as recipeService from '../../services/recipeService';
// import * as likesService from '../../services/likesService';
import ConfirmModal from '../Modal.js';
// import { useNotificationsContext } from '../../contexts/NotificationsContext';
// import CreateComment from '../Comments/CreateComment';
// import AllComments from '../Comments/AllComments';
import styles from './RecipeDetails.module.css';
import './RecipeDetails.css';

export default function Details() {
	const { user } = useContext(AuthContext);
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [confirm, setConfirm] = useState(false);
	// const { newNotification } = useNotificationsContext();
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
			.catch((err) => {
				// newNotification("Sorry, we couldn't find the recipe you are looking for ;(");
				navigate('/recipes');
				console.log(err);
			});
	}, [recipeId]);

	// useEffect(() => {
	// 	likesService
	// 		.getRecipeLikes(recipeId)
	// 		.then((result) => {
	// 			setRecipe((state) => ({ ...state, likes: result }));
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [recipeId]);

	const confirmDelete = (e) => {
		e.preventDefault();
		setConfirm(true);
	};

	const onDeleteHandler = (e) => {
		e.preventDefault();
		recipeService
			.deleteRecipe(recipeId, user.accessToken)
			.then(() => {
				console.log('delete');
				navigate('/recipes');
			})
			.finally(() => setConfirm(false));
	};

	const ownerButtons = (
		<article className={styles['owner-buttons']}>
			<Link to={`/${recipe._id}/edit`} className={styles['btn-orange']}>
				Edit
			</Link>
			<button className={styles['btn-red']} onClick={confirmDelete}>
				Delete
			</button>
		</article>
	);

	// const onLikeHandler = (e) => {
	// 	e.preventDefault();
	// 	if (user._id === recipe._ownerId) {
	// 		// newNotification("You can/'t like your own recipe!");
	// 		return;
	// 	}
	// 	if (recipe.likes.includes(user._id)) {
	// 		// newNotification('You already liked this recipe!');
	// 		return;
	// 	}

	// 	likesService.likeRecipe(user._id, recipeId, user.accessToken).then(() => {
	// 		setRecipe((state) => ({ ...state, likes: [...state.likes, user._id] }));
	// 	});
	// };

	return (
		<>
			{/* <div id="gallery" style={{ marginTop: 150 }} className="header text-center  text-center bg-dark text-light has-height-md middle-items wow fadeIn">
				<div className=" overlay text-white ">
					<section className={styles['details']}>
						<ConfirmModal show={confirm} onClose={() => setConfirm(false)} onSave={onDeleteHandler} />
						<section className={styles['card']}>
							<article className={styles['card-content']}>
								<h2 className={styles['card-content-title']}>{recipe.name}</h2>
							</article>
							<article className={styles['recipie-info']}>
								<article className={styles['info']}>
									<article className={styles['card-image']}>
										<img src={recipe.img} alt="" />
									</article>

									<article className={styles['card-props']}>
										<article className={styles['time']}>
											<p className={styles['time-title']}>Cook time</p>
											<p className={styles['time-text']}>
												<i className="far fa-clock"></i>
												{recipe.cookingTime} min
											</p>
										</article>
										<article className={styles['serves']}>
											<p className={styles['serves-title']}>Serves</p>
											<p className={styles['serves-text']}>
												<i className="fas fa-utensils"></i>
												{recipe.serves}
											</p>
										</article>
										<article className={styles['difficulty']}>
											<p className={styles['difficulty-title']}>Difficulty</p>

											<p className={styles['difficulty-text']}>
												<i className="fas fa-leaf"></i>
												{recipe.difficulty}
											</p>
										</article>
									</article>
									<article className={styles['guest']}>
										<p className={styles['likes']}>
											<i className="fas fa-heart"></i>
											{recipe.likes?.length === 0 ? 'No likes' : `Liked by ${recipe.likes?.length} Pasta Lover${recipe.likes?.length > 1 ? 's' : ''}`}
										</p>
										{user._id && user._id !== recipe._ownerId ? (
											<button
												className={styles['btn-pink']}
												// onClick={onLikeHandler}
												style={{
													display: recipe.likes?.includes(user._id) ? 'none' : 'block',
												}}
											>
												Like
											</button>
										) : (
											''
										)}
									</article>

									{user._id && user._id === recipe._ownerId ? ownerButtons : ''}
								</article>
								<article className={styles['cooking']}>
									<article className={styles['cooking-ingredients']}>
										<h2 className={styles['cooking-ingredients-title']}>Ingredients</h2>
										<article className={styles['cooking-ingredients-content']}>
											<ul>
												{recipe.ingredients?.map((x, i) => (
													<li key={i}>{x}</li>
												))}
											</ul>
										</article>
									</article>
									<article className={styles['cooking-steps']}>
										<h2 className={styles['cooking-steps-title']}>Steps</h2>
										<article className={styles['cooking-steps-content']}>
											{recipe.method?.map((x, i) => (
												<li key={i}>{x}.</li>
											))}
										</article>
									</article>
								</article>
							</article>
						</section>
						<article className={styles['comment-content']}>
							<h2 className={styles['comment-content-title']}>Comments</h2>
						</article>
						{/* <AllComments recipeId={recipeId} /> */}
			{/* <CreateComment recipeId={recipeId} /> */}
			{/* </section>
				</div> */}
			<section className="single-post has-bg-overlay ">
				<div id="recipe-post" className="container-sm text-dark bg-light bg-opacity-25 wow fadeIn">
					<div className="row d-flex justify-content-center">
						<div className="col-lg-8">
							<div className="single-post__title">
								<div className="single-post__title__meta">
									<h2>08</h2>
									<span>Aug</span>
								</div>
								<div className="single-post__title__text">
									<ul className="label">
										<li>Vegan</li>
										<li>Desserts</li>
									</ul>
									<h4>Weight loss diet: Ditching this one food can help you slim down fast - what is it?</h4>
									<ul className="widget">
										<li>by Admin</li>
										<li>3 min read</li>
										<li>20 Comment</li>
									</ul>
								</div>
							</div>
							<div className="single-post__social__item">
								<ul>
									<p>
										<u>Per serving:</u>
									</p>
									Calories:<li>500 kcal</li>
									Protein:<li>100g</li>
									Carbs:<li>100g</li>
									Fat:<li>10g</li>
								</ul>
							</div>
							<div className="single-post__top__text">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
									ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua accusantium doloremque laudantium.{' '}
								</p>
							</div>
							<div className="single-post__recipe__details">
								<div className="single-post__recipe__details__option">
									<ul>
										<li>
											<h5>
												<i className="fa fa-user" /> SERVES
											</h5>
											<span>2 as a main, 4 as a side</span>
										</li>
										<li>
											<h5>
												<i className="fa fa-clock" /> PREP TIME
											</h5>
											<span>15 minute</span>
										</li>
										<li>
											<h5>
												<i className="fa fa-clock" /> Cook TIME
											</h5>
											<span>15 minute</span>
										</li>
									</ul>
								</div>
								<div className="single-post__recipe__details__indegradients">
									<h5>Ingredients</h5>
									<ul>
										<li>Ingredients</li>
										<li>1 cup (240 ml) water, plus more as needed</li>
										<li>1 teaspoon fine sea salt</li>
										<li>2 tablespoons olive oil</li>
										<li>3/4 cup (120 g) fine polenta</li>
										<li>3 cups sunflower oil, plus more as needed</li>
										<li>7 ounces (200 g) peeled parsnips, very thinly sliced on a mandoline</li>
										<li>1 pinch fine sea salt, plus more to taste</li>
										<li>2 tablespoons (30 g) unsalted butter</li>
										<li>1/2 tablespoon maple syrup (up to 1 tablespoon as needed)</li>
									</ul>
								</div>
								<div className="single-post__recipe__details__direction">
									<h5>Directions</h5>
									<ul>
										<li>
											<span>1.</span> Combine all of the ingredients, kneading to form a smooth dough.
										</li>
										<li>
											<span>2.</span> Allow the dough to rise, in a lightly greased, covered bowl, until it’s doubled in size, about 90 minutes.
										</li>
										<li>
											<span>3.</span> Gently divide the dough in half; it’ll deflate somewhat.
										</li>
										<li>
											<span>4.</span> Gently shape the dough into two oval loaves; or, for longer loaves, two 10″ to 11″ logs. Place the loaves on a lightly greased or parchment-lined baking sheet.
											Cover and let rise until very puffy, about 1 hour. Towards the
										</li>
										<li>
											<span>5.</span> end of the rising time, preheat the oven to 425°F.
										</li>
										<li>
											<span>6.</span> Spray the loaves with lukewarm water.
										</li>
										<li>
											<span>7.</span> Make two fairly deep diagonal slashes in each; a serrated bread knife, wielded firmly, works well here.
										</li>
										<li>
											<span>8.</span> Bake the bread for 25 to 30 minutes, until it’s a very deep golden brown. Remove it from the oven, and cool on a rack.
										</li>
									</ul>
								</div>
							</div>

							<div className="single-post__comment">
								<div className="widget__title">
									<h4>03 Comment</h4>
								</div>
								<div className="single-post__comment__item">
									<div className="single-post__comment__item__pic">
										<img src="https://i2-prod.dailyrecord.co.uk/incoming/article26938233.ece/ALTERNATES/s1200c/1_Screenshot-2022-05-11-at-154927.png" alt="" />
									</div>
									<div className="single-post__comment__item__text">
										<h5>Brandon Kelley</h5>
										<span>15 Aug 2017</span>
										<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.</p>
										<ul>
											<li>
												<a href="#">
													<i className="far fa-heart" />
												</a>
											</li>
											<li>
												<a href="#">
													<i className="fa fa-share-square" />
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="single-post__comment__item single-post__comment__item--reply">
									<div className="single-post__comment__item__pic">
										<img src="https://i2-prod.dailyrecord.co.uk/incoming/article26938233.ece/ALTERNATES/s1200c/1_Screenshot-2022-05-11-at-154927.png" alt="" />
									</div>
									<div className="single-post__comment__item__text">
										<h5>Brandon Kelley</h5>
										<span>15 Aug 2017</span>
										<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.</p>
										<ul>
											<li>
												<a href="#">
													<i className="far fa-heart" />
												</a>
											</li>
											<li>
												<a href="#">
													<i className="fa fa-share-square" />
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="single-post__comment__item">
									<div className="single-post__comment__item__pic">
										<img src="https://i2-prod.dailyrecord.co.uk/incoming/article26938233.ece/ALTERNATES/s1200c/1_Screenshot-2022-05-11-at-154927.png" alt="" />
									</div>
									<div className="single-post__comment__item__text">
										<h5>Brandon Kelley</h5>
										<span>15 Aug 2017</span>
										<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.</p>
										<ul>
											<li>
												<a href="#">
													<i className="far fa-heart" />
												</a>
											</li>
											<li>
												<a href="#">
													<i className="fa fa-share-square" />
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="single-post__leave__comment">
								<div className="widget__title">
									<h4>Leave a comment</h4>
								</div>
								<form action="#">
									<div className="input-list">
										<input type="text" placeholder="Name" />
										<input type="text" placeholder="Email" />
										<input type="text" placeholder="Website" />
									</div>
									<textarea placeholder="Message" defaultValue={''} />
									<button type="submit" className="site-btn btn btn-primary">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* </div> */}
		</>
	);
}
