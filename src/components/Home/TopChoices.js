import * as recipeService from '../../services/recipeService';
import { useEffect, useState } from 'react';
import TopChoicesCard from './TopChoicesCard';

export default function TopChoices() {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		recipeService
			.getRecentRecipes()
			.then((result) => {
				if (result.code === 404) {
					throw new Error(result.message);
				}
				const recipesData = Object.values(result);
				console.log(recipesData);
				setRecipes(recipesData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div id="top-choices" className="container-fluid bg-dark text-light py-5 text-center wow zoomIn">
			<h2 className="section-title py-5">Check our most recent entries!</h2>
			<div className="row justify-content-center">
				<div className="col-sm-7 col-md-4 mb-5">
					<ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#breakfast" role="tab" aria-controls="pills-home" aria-selected="true">
								Breakfast
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#meals" role="tab" aria-controls="pills-profile" aria-selected="false">
								Meals
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#desserts" role="tab" aria-controls="pills-profile" aria-selected="false">
								Desserts
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="tab-content " id="pills-tabContent">
				<div className="tab-pane fade show active" id="breakfast" role="tabpanel" aria-labelledby="pills-home-tab">
					<div className="row">
						{recipes && recipes.length > 0 ? (
							recipes.filter((x) => x.category === 'Breakfast').map((x) => <TopChoicesCard key={x._id} recipe={x} />)
						) : (
							<h2 style={{ margin: 'auto' }}>No recipes in breakfast category!</h2>
						)}
					</div>
				</div>
				<div className="tab-pane fade" id="meals" role="tabpanel" aria-labelledby="pills-profile-tab">
					<div className="row">
						{recipes && recipes.length > 0 ? (
							recipes.filter((x) => x.category === 'Meals').map((x) => <TopChoicesCard key={x._id} recipe={x} />)
						) : (
							<h2 style={{ margin: 'auto' }}>No recipes in meals category!</h2>
						)}
					</div>
				</div>
				<div className="tab-pane fade" id="desserts" role="tabpanel" aria-labelledby="pills-profile-tab">
					<div className="row">
						{recipes && recipes.length > 0 ? (
							recipes.filter((x) => x.category === 'Desserts').map((x) => <TopChoicesCard key={x._id} recipe={x} />)
						) : (
							<h2 style={{ margin: 'auto' }}>No recipes in desserts category!</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
