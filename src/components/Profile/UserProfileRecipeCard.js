import { HashLink } from 'react-router-hash-link';
import '../AnabolicCookbook/CookbookCard.css';

export default function UserProfileRecipeCard({ recipe }) {
	return (
		<div className="ml-2 mr-1 mb-2 wow fadeIn card">
			<img src={recipe.imgUrl} alt="" style={{ width: 170, height: 110 }} />

			<HashLink to={`/cookbook/${recipe._id}/details/#`} className="img__caption ml-2">
				<h5 className="text-white">{recipe.title}</h5>
			</HashLink>
		</div>
	);
}
