export default function Contacts() {
	return (
		<div id="contact" className="container-fluid bg-dark text-light border-top wow fadeIn">
			<div className="row">
				<div className="col-md-6 px-0">
					<div id="map" style={{ width: '100%', height: '100%', minHeight: 400 }} />
				</div>
				<div className="col-md-6 px-5 has-height-lg middle-items">
					<h3>FIND US</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, laboriosam doloremque odio delectus, sunt magnam laborum impedit molestiae, magni quae ipsum, ullam eos! Alias suscipit
						impedit et, adipisci illo quam.
					</p>
					<div className="text-muted">
						<p>
							<span className="ti-location-pin pr-3" /> 12345 Fake ST NoWhere, AB Country
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
