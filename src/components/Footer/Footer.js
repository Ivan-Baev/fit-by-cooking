import './Footer.module.css';

export default function Footer() {
	return (
		<div id="footer">
			<div className="container-fluid bg-dark text-light has-height-md middle-items border-top text-center wow fadeIn">
				<div className="row">
					<div className="col-sm-4">
						<h3>EMAIL US</h3>
						<p className="text-muted">info@fitbycooking.com</p>
					</div>
					<div className="col-sm-4">
						<h3>CALL US</h3>
						<p className="text-muted">(123) 456-7890</p>
					</div>
					<div className="col-sm-4">
						<h3>FIND US</h3>
						<p className="text-muted">ул. "Кораб Планина" 10, София, България</p>
					</div>
				</div>
			</div>
			<div className="bg-dark text-light text-center border-top wow fadeIn">
				<p className="mb-0 py-3 text-muted small">
					© Copyright Made with <i className="ti-heart text-danger" /> By <a href="http://fitbycooking.com">Fit By Cooking</a>
				</p>
			</div>
		</div>
	);
}
