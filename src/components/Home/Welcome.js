import { HashLink } from 'react-router-hash-link';

export default function Welcome() {
	return (
		<article id="home" className="header wow fadeIn">
			<div className="overlay text-white text-center ">
				<h1 className="display-2 font-weight-bold my-3">Fit by Cooking</h1>
				<h2 className="display-4 mb-5">Share your favourite recipes with us!</h2>
				<div>
					<HashLink smooth className="btn btn-lg btn-primary" to="#top-choices" style={{ marginRight: '10px' }}>
						View our top choices
					</HashLink>
					<HashLink smooth className="btn btn-lg btn-primary" to="#top-choices">
						Share your recipe!
					</HashLink>
				</div>
			</div>
		</article>
	);
}
