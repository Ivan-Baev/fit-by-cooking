import { HashLink } from 'react-router-hash-link';
import './TopChoiceCard.css';

export default function TopChoiceCard({ recipe }) {
	return (
		<div className="col-md-4">
			<div className="card bg-transparent border my-3 my-md-0">
				<img src="assets/imgs/blog-1.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
				<div className="card-body">
					<h3 className="pt20 pb20">{recipe.title}</h3>
					<h3 className="text-center mb-4">
						<HashLink smooth to={`cookbook/${recipe._id}/details/#top`} className="badge badge-primary">
							Read recipe...
						</HashLink>
					</h3>
				</div>
			</div>
		</div>
	);
}
