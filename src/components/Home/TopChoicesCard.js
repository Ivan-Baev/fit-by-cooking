import './TopChoiceCard.css';
import { useNavigate, Link } from 'react-router-dom';

export default function TopChoiceCard({ recipe }) {
	const navigate = useNavigate();
	function onClickHandler(e) {
		e.preventDefault();
		navigate(`cookbook/${recipe._id}/details/#`);
	}
	return (
		<div className="col-md-4" onClick={onClickHandler}>
			<div className="card bg-transparent border my-3 my-md-0">
				<img src={recipe.imgUrl} alt="" className="rounded-0 card-img-top mg-responsive" style={{ maxHeight: '350px', height: '350px' }} />
				<div className="card-body">
					<h3 className="pt20 pb20">{recipe.title}</h3>
					<div style={{ display: 'flex', justifyContent: 'center' }} className="mt-3">
						<span className="badge badge-info mr-2">Total calories: {recipe.calories} kcal</span>
						<span className="badge badge-info mr-2">Protein: {recipe.protein} g</span>
						<span className="badge badge-info mr-2">Fats: {recipe.fat} g</span>
						<span className="badge badge-info mr-2">Carbs: {recipe.carbs} g</span>
					</div>
					<h3 className="text-center mt-4">
						<p className="badge badge-primary">Read entire recipe</p>
					</h3>
				</div>
			</div>
		</div>
	);
}
