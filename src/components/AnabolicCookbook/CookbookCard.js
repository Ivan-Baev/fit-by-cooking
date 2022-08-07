import { HashLink } from 'react-router-hash-link';
import './CookbookCard.css';

export default function CookbookCard({ recipe }) {
	return (
		<div className="col-sm-6 col-lg-4 gallary-item wow fadeIn">
			<div className="img__wrap" style={{ height: '100%' }}>
				<img src={recipe.imgUrl} style={{ maxHeight: '475px', height: '475px' }} alt="" className="gallary-img" />
				<h3 className="img__caption">{recipe.title}</h3>

				<div className="gallary-overlay" style={{ flexDirection: 'column', alignItems: 'start' }}>
					<HashLink to={`${recipe._id}/details/#`} className="gallary-overlay">
						<i className="gallary-icon ti-plus" />
					</HashLink>
					<div className="img__description">
						<h3>{recipe.title}</h3>
					</div>
					<div className="img__description">
						<h4>Nutritional facts:</h4>
						Per serving: <span> {Math.round(recipe.calories / recipe.servings, 0)} kcal</span>
						<span> Protein: {Math.round(recipe.protein / recipe.servings, 0)}g </span>
						<span> Fats: {Math.round(recipe.fat / recipe.servings, 0)}g</span>
						<span> Carbs: {Math.round(recipe.carbs / recipe.servings, 0)}g</span>
					</div>
					<div className="img__description ">
						<h4>From the author:</h4>
						{recipe.description}
					</div>
					<div className="img__description">Click to read the entire recipe..</div>
				</div>
			</div>
		</div>
	);
}
