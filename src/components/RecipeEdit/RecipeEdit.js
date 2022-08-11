import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import '../RecipeDetails/RecipeDetails.css';

import { AuthContext } from '../../contexts/AuthContext';
import * as recipeService from '../../services/recipeService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { useParams } from 'react-router-dom';

function RecipeEdit() {
	const { user } = useContext(AuthContext);
	const { recipeId } = useParams();
	const { addNotification } = useNotificationContext();
	const [isValid, setIsValid] = useState({ fields: {}, errors: {} });

	const navigate = useNavigate();
	let [recipex, setRecipe] = useState({});
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);

	useEffect(() => {
		recipeService
			.getRecipeById(recipeId)
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				setRecipe(result);
				let fields = Object.keys(result).reduce((acc, value) => {
					return { ...acc, [value]: value };
				}, {});

				setInstructions(result.instructions);
				setIngredients(result.ingredients);
				setIsValid((oldIsValid) => {
					return { ...oldIsValid, ...{ fields: fields } };
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [recipeId]);

	let recipe = {
		author: recipex.author,
		title: recipex.title,
		imgUrl: recipex.imgUrl,
		category: recipex.category,
		prepTime: recipex.prepTime,
		cookingTime: recipex.cookingTime,
		servings: recipex.servings,
		description: recipex.description,
		calories: recipex.calories,
		protein: recipex.protein,
		fat: recipex.fat,
		carbs: recipex.carbs,
		ingredients: ingredients,
		instructions: instructions,
	};

	function addIngredientHandler(e) {
		e.preventDefault();
		let formData = new FormData(e.currentTarget.closest('#createRecipeForm'));

		let ingredient = formData.get('ingredient');
		let weight = formData.get('weight');
		let identifier = new Date().getTime();

		if (ingredient === '' || weight < 1 || weight === '') {
			return;
		}
		setIngredients((oldIngredients) => [...oldIngredients, { identifier, ingredient, weight }]);

		recipe = {
			...recipe,
			ingredients: [...recipe.ingredients, ingredients],
		};

		const errors = isValid.errors;

		if (recipe.ingredients.length < 1) {
			errors['ingredient'] = 'Please add ingredient!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields['ingredient'] = 'ingredient';
			errors['ingredient'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	}

	function removeIngredientHandler(e) {
		e.preventDefault();

		let recipes = recipe.ingredients;
		let formData = e.currentTarget.parentElement;
		let idx = formData.getAttribute('id');
		let filteredRecipes = recipes.filter((item) => {
			return item.identifier !== Number(idx);
		});

		setIngredients(filteredRecipes);

		recipe = {
			...recipe,
			ingredients: ingredients,
		};
	}

	function addInstructionHandler(e) {
		e.preventDefault();

		let formData = new FormData(e.currentTarget.closest('#createRecipeForm'));

		let instruction = formData.get('instruction');
		let identifier = new Date().getTime();

		if (instruction === '') {
			return;
		}

		setInstructions((oldInstructions) => [...oldInstructions, { identifier, instruction }]);

		recipe = {
			...recipe,
			instructions: [...recipe.instructions, instructions],
		};

		const errors = isValid.errors;

		if (recipe.instructions.length < 1) {
			errors['instruction'] = 'Please add instructions!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields['instruction'] = 'instruction';
			errors['instruction'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	}

	function removeInstructionHandler(e) {
		e.preventDefault();

		let formData = e.currentTarget.parentElement;
		let idx = formData.getAttribute('id');
		let filteredInstructions = recipe.instructions.filter((item) => {
			return item.identifier !== Number(idx);
		});

		setInstructions(filteredInstructions);

		recipe = {
			...recipe,
			instructions: instructions,
		};
	}

	function addRecipeDetailsHandler(e) {
		e.preventDefault();
		let formData = new FormData(e.currentTarget.closest('#createRecipeForm'));
		const recipeData = Object.fromEntries(formData);

		recipe = {
			...recipe,
			title: recipeData.title,
			imgUrl: recipeData.imgUrl,
			category: recipeData.category,
			prepTime: recipeData.prepTime,
			cookingTime: recipeData.cookingTime,
			servings: recipeData.servings,
			description: recipeData.description,
			calories: recipeData.calories,
			protein: recipeData.protein,
			fat: recipeData.fat,
			carbs: recipeData.carbs,
		};
	}

	function editRecipeHandler(e) {
		e.preventDefault();
		if (errorValidationHandler()) {
			addRecipeDetailsHandler(e);
			recipeService
				.editRecipe(recipeId, recipe, user.accessToken)
				.then((result) => {
					addNotification(`Successfully edited recipe: ${recipe.title} !`, types.success);
					navigate(`/cookbook/${recipeId}/details`);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			addNotification(`Fix your errors and try again!`, types.error);
		}
	}

	function errorValidationHandler() {
		const fields = isValid.fields;
		const errors = isValid.errors;
		let formIsValid = true;
		if (!fields['title']) {
			formIsValid = false;
			errors['title'] = 'Recipe title should be at least 3 characters long!';
		}

		if (!fields['category']) {
			formIsValid = false;
			errors['category'] = 'Please select one of the category options!';
		}

		if (!fields['imgUrl']) {
			formIsValid = false;
			errors['imgUrl'] = 'Please use a valid image URL!';
		}

		if (!fields['prepTime']) {
			formIsValid = false;
			errors['prepTime'] = 'Prep time should be between 5 and 60 minutes!';
		}

		if (!fields['cookingTime']) {
			formIsValid = false;
			errors['cookingTime'] = 'Cooking time should be between 5 and 120 minutes!';
		}

		if (!fields['servings']) {
			formIsValid = false;
			errors['servings'] = 'Servings should be between 1 and 8!';
		}

		if (!fields['calories']) {
			formIsValid = false;
			errors['calories'] = 'Field is required!';
		}
		if (!fields['protein']) {
			formIsValid = false;
			errors['protein'] = 'Field is required!';
		}
		if (!fields['carbs']) {
			formIsValid = false;
			errors['carbs'] = 'Field is required!';
		}
		if (!fields['fat']) {
			formIsValid = false;
			errors['fat'] = 'Field is required!';
		}
		if (!fields['description']) {
			formIsValid = false;
			errors['description'] = 'Description should be between 100 and 2000!';
		}

		if (recipe.instructions.length < 1) {
			formIsValid = false;
			errors['instruction'] = 'Please add instructions!';
		}

		if (recipe.ingredients.length < 1) {
			formIsValid = false;
			errors['ingredient'] = 'Please add ingredients!';
		}

		setIsValid((oldIsValid) => {
			return { ...oldIsValid, ...{ errors: errors } };
		});

		return formIsValid;
	}

	const onTitleChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value.length < 3) {
			errors['title'] = 'Recipe title should be at least 3 characters long!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['title'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onImgUrlChangeHandler = (e) => {
		const errors = isValid.errors;
		let regExp = new RegExp(
			/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
		);
		if (!regExp.test(e.target.value)) {
			errors['imgUrl'] = 'Please use a valid image URL!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['imgUrl'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onCategoryChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value === 'default') {
			errors['category'] = 'Please select one of the category options!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['category'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onPrepTimeChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 5 || e.target.value > 60) {
			errors['prepTime'] = 'Prep time should be between 5 and 60 minutes!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['prepTime'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onCookingTimeChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 5 || e.target.value > 60) {
			errors['cookingTime'] = 'Cooking time should be between 5 and 120 minutes!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['cookingTime'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onServingsChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 1 || e.target.value > 8) {
			errors['servings'] = 'Servings  should be between 1 and 8!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['servings'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onCaloriesChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 1 || e.target.value === '') {
			errors['calories'] = 'Field is required!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['calories'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onProteinChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 1 || e.target.value === '') {
			errors['protein'] = 'Field is required!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['protein'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onCarbsChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 1 || e.target.value === '') {
			errors['carbs'] = 'Field is required!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['carbs'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onFatChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 1 || e.target.value === '') {
			errors['fat'] = 'Field is required!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['fat'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	const onDescriptionChangeHandler = (e) => {
		const errors = isValid.errors;
		if (e.target.value < 100 || e.target.value > 2000) {
			errors['description'] = 'Description should be between 100 and 2000!';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			const fields = isValid.fields;
			fields[e.target.name] = e.target.name;
			errors['description'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors }, ...fields };
			});
		}
	};

	return (
		<section className="single-post has-bg-overlay ">
			<div id="recipe-post" className="container-sm text-dark bg-light bg-opacity-25 wow fadeIn">
				<div className="row d-flex justify-content-center">
					<div className="col-lg-8">
						<div className="single-post__title">
							<div className="single-post__title__text text-center">
								<h2>Edit your recipe!</h2>
							</div>
						</div>
						<div className="row d-flex justify-content-center">
							<form id="createRecipeForm" onSubmit={editRecipeHandler}>
								<div className="single-post__leave__comment">
									<div className="widget__title text-center">
										<h4>Step 1: Edit basic information for your recipe!</h4>
									</div>
									<div style={{ maxWidth: '755px' }}>
										<div className="form-group" action="#">
											<div className="form-group ">
												<input
													className={isValid.errors['title'] ? 'form-control form-error' : 'form-control bg-dark'}
													type="text"
													placeholder="Title"
													name="title"
													id="title"
													title="Title"
													required
													onBlur={onTitleChangeHandler}
													defaultValue={recipe.title}
												/>
												{isValid.errors['title'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['title']}
													</p>
												)}
											</div>
											<div className="form-group">
												<input
													className={isValid.errors['imgUrl'] ? 'form-control form-error' : 'form-control bg-dark'}
													type="url"
													placeholder="Image url"
													name="imgUrl"
													id="imgUrl"
													required
													onBlur={onImgUrlChangeHandler}
													defaultValue={recipe.imgUrl}
													title="Image url here"
												/>
												{isValid.errors['imgUrl'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['imgUrl']}
													</p>
												)}
											</div>
											<div className="form-group">
												<select
													className={isValid.errors['category'] ? 'form-control form-error' : 'form-control bg-dark'}
													required
													name="category"
													onBlur={onCategoryChangeHandler}
													defaultValue={recipe.category}
													title="Category"
												>
													<option value="default" disabled>
														Select your category
													</option>
													<option value="Breakfast">Breakfast</option>
													<option value="Meals">Meals</option>
													<option value="Dessert">Desserts</option>
												</select>
												{isValid.errors['category'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['category']}
													</p>
												)}
											</div>
											<div className="form-group">
												<input
													className={isValid.errors['prepTime'] ? 'form-control form-error' : 'form-control bg-dark'}
													type="number"
													min="5"
													max="60"
													placeholder="Prep time (minutes)"
													required
													name="prepTime"
													onBlur={onPrepTimeChangeHandler}
													defaultValue={recipe.prepTime}
													title="Preparation time"
												/>
												{isValid.errors['prepTime'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['prepTime']}
													</p>
												)}
											</div>
											<div className="form-group">
												<input
													className={isValid.errors['cookingTime'] ? 'form-control form-error' : 'form-control bg-dark'}
													type="number"
													placeholder="Cooking time (minutes)"
													required
													min="5"
													max="120"
													name="cookingTime"
													onBlur={onCookingTimeChangeHandler}
													defaultValue={recipe.cookingTime}
													title="Cooking time"
												/>
												{isValid.errors['cookingTime'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['cookingTime']}
													</p>
												)}
											</div>

											<div className="form-group">
												<input
													className={isValid.errors['servings'] ? 'form-control form-error' : 'form-control bg-dark'}
													type="number"
													min="1"
													max="8"
													placeholder="Servings"
													required
													name="servings"
													onBlur={onServingsChangeHandler}
													defaultValue={recipe.servings}
													title="Servings"
												/>
												{isValid.errors['servings'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['servings']}
													</p>
												)}
											</div>
											<div className="form-group" style={{ display: 'flex', alignContent: 'space-between' }}>
												<div style={{ flexGrow: '1' }}>
													<input
														className={isValid.errors['calories'] ? 'form-control form-error' : 'form-control bg-dark'}
														type="number"
														min="1"
														max="2000"
														placeholder="Calories"
														required
														name="calories"
														onBlur={onCaloriesChangeHandler}
														defaultValue={recipe.calories}
														title="Calories"
													/>
													{isValid.errors['calories'] && (
														<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
															{isValid.errors['calories']}
														</p>
													)}
												</div>
												<div style={{ flexGrow: '1' }}>
													<input
														className={isValid.errors['protein'] ? 'form-control form-error' : 'form-control bg-dark'}
														type="number"
														min="1"
														max="2000"
														placeholder="Protein"
														required
														onBlur={onProteinChangeHandler}
														name="protein"
														defaultValue={recipe.protein}
														title="Protein"
													/>
													{isValid.errors['protein'] && (
														<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
															{isValid.errors['protein']}
														</p>
													)}
												</div>
												<div style={{ flexGrow: '1' }}>
													<input
														onBlur={onFatChangeHandler}
														className={isValid.errors['fat'] ? 'form-control form-error' : 'form-control bg-dark'}
														type="number"
														min="1"
														max="2000"
														placeholder="Fat"
														required
														name="fat"
														defaultValue={recipe.fat}
														title="Fat"
													/>
													{isValid.errors['fat'] && (
														<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
															{isValid.errors['fat']}
														</p>
													)}
												</div>
												<div style={{ flexGrow: '1' }}>
													<input
														onBlur={onCarbsChangeHandler}
														className={isValid.errors['carbs'] ? 'form-control form-error' : 'form-control bg-dark'}
														type="number"
														min="1"
														max="2000"
														placeholder="Carbs"
														required
														name="carbs"
														defaultValue={recipe.carbs}
														title="Carbs"
													/>
													{isValid.errors['carbs'] && (
														<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
															{isValid.errors['carbs']}
														</p>
													)}
												</div>
											</div>
											<div className="form-group">
												<textarea
													onBlur={onDescriptionChangeHandler}
													className={isValid.errors['description'] ? 'form-control form-error text-light' : 'form-control bg-dark text-light'}
													rows="10"
													placeholder="Add description"
													required
													name="description"
													defaultValue={recipe.description}
													title="Description"
												></textarea>
												{isValid.errors['description'] && (
													<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
														{isValid.errors['description']}
													</p>
												)}
											</div>
										</div>
									</div>
									<div className="text-center widget__title">
										<h4>Step 2: Edit ingredients!</h4>
									</div>
									<div style={{ maxWidth: '755px' }}>
										<div className="form-group" style={{ display: 'flex' }}>
											<input className="form-control bg-dark" type="text" placeholder="Ingredient" name="ingredient" id="ingredient" required />
											<input className="form-control bg-dark w-50" type="number" min="0" placeholder="Weight (grams)" name="weight" id="weight" required />
											<button
												type="submit"
												onClick={(e) => addIngredientHandler(e)}
												className="btn btn-success"
												style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
											>
												<i className="fas fa-plus-circle"></i>
											</button>
										</div>
										{isValid.errors['ingredient'] && (
											<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
												{isValid.errors['ingredient']}
											</p>
										)}
										<ul>
											{recipe.ingredients
												? recipe.ingredients.map((recipe, index) => (
														<div key={recipe.identifier} id={recipe.identifier} className="form-group" style={{ display: 'flex', marginBottom: '1px' }}>
															<div className="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled="">
																{index + 1}. {recipe.ingredient} {recipe.weight}g
															</div>

															<button
																type="submit"
																onClick={(e) => removeIngredientHandler(e)}
																className="btn btn-danger"
																style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
															>
																<i className="fas fa-minus-circle"></i>
															</button>
														</div>
												  ))
												: ''}
										</ul>
									</div>
									<div className="text-center widget__title">
										<h4>Step 3: Edit instructions!</h4>
									</div>
									<div style={{ maxWidth: '755px' }}>
										<div className="form-group" style={{ display: 'flex' }}>
											<textarea rows="5" className="form-control bg-dark mb-0 text-white" type="text" placeholder="Type instructions" name="instruction" id="instruction" required />

											<button
												type="submit"
												onClick={(e) => addInstructionHandler(e)}
												className="btn btn-success"
												style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
											>
												<i className="fas fa-plus-circle"></i>
											</button>
										</div>
										{isValid.errors['instruction'] && (
											<p className="error-message" style={{ color: 'red', fontSize: '16px' }}>
												{isValid.errors['instruction']}
											</p>
										)}
										<ul>
											{recipe.instructions
												? recipe.instructions.map((recipe, index) => (
														<div key={recipe.identifier} id={recipe.identifier} className="form-group" style={{ display: 'flex', marginBottom: '1px' }}>
															<div
																className="form-control"
																id="disabledInput"
																type="text"
																placeholder="Disabled input here..."
																disabled=""
																style={{ height: 'fit-content', overflow: 'hidden', maxWidth: '100%' }}
															>
																{index + 1}. {recipe.instruction}
															</div>
															<button
																type="submit"
																onClick={(e) => removeInstructionHandler(e)}
																className="btn btn-danger"
																style={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
															>
																<i className="fas fa-minus-circle"></i>
															</button>
														</div>
												  ))
												: ''}
										</ul>
									</div>
								</div>
								<button type="submit" onClick={(e) => editRecipeHandler(e)} className="w-100 site-btn btn btn-primary">
									Edit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default RecipeEdit;
