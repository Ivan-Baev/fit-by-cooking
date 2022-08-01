import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<>
			<div id="gallery" style={{ marginTop: 150 }} className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
				<h2 className="section-title">Ooops..</h2>
				<h2 className="section">Sorry, we couldn't find the page you are looking for :</h2>
				<article className="text-secondary">
					Go back to <Link to="/">Home page</Link>
				</article>
			</div>
		</>
	);
}
