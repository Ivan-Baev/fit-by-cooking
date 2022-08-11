import GoogleMap from './GoogleMap/GoogleMap';

export default function Contacts() {
	return (
		<div id="contact" className="container-fluid bg-dark text-light border-top wow fadeIn">
			<div className="row">
				<div className="col-md-6 px-5 has-height-lg middle-items">
					<GoogleMap></GoogleMap>
				</div>
				<div className="col-md-6 px-5 has-height-lg middle-items">
					<h3>FIND US</h3>
					<div className="text-muted">
						<p>
							<span className="ti-location-pin pr-3" /> ул. "Кораб Планина" 10, София, България
						</p>
						<p>
							<span className="ti-support pr-3" /> (123) 456-7890
						</p>
						<p>
							<span className="ti-email pr-3" />
							info@fitbycooking.com
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
