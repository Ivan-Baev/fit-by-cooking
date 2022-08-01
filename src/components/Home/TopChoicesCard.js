import './TopChoiceCard.css';

export default function TopChoiceCard({ recipe }) {
	return (
		<div className="col-md-4">
			<div className="card bg-transparent border my-3 my-md-0">
				<img src="assets/imgs/blog-1.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
				<div className="card-body">
					<h1 className="text-center mb-4">
						<a href="#" className="badge badge-primary">
							{recipe.calories} kcal
						</a>
					</h1>
					<h4 className="pt20 pb20">{recipe.title}</h4>
					<p className="text-white">{recipe.difficulty}</p>
				</div>
			</div>
		</div>
	);
}
