import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './CookbookCard.css';

export default function CookbookCard({ recipe }) {
	return (
		<div className="col-sm-6 col-lg-4 gallary-item wow fadeIn">
			<div className="img__wrap">
				<img src="../assets/imgs/gallary-2.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
				<h3 className="img__caption">{recipe.title}</h3>

				<div className="img__description_layer">
					<HashLink to={`${recipe._id}/details/#top`} className="gallary-overlay">
						<i className="gallary-icon ti-plus" />
					</HashLink>
					<div className="img__description">{recipe.title}</div>
					<div className="img__description">{recipe.calories} kcal</div>
					<div className="img__description">This image looks super neat.</div>
				</div>
			</div>
		</div>
	);
}
