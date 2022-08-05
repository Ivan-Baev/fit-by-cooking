export default function Contacts() {
	return (
		<div id="contact" className="container-fluid bg-dark text-light border-top wow fadeIn">
			<div className="row">
				<div className="col-md-6 px-5 has-height-lg middle-items">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.4299369774553!2d23.322275515685508!3d42.67343432324556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85aae0f7d169%3A0x13d44f430e23dded!2z0LHRg9C7LiDigJ7QlNC20LXQudC80YEg0JHQsNGD0YfQtdGA4oCcIOKEljU4LCAxNDA3INC2LtC6LiDQm9C-0LfQtdC90LXRhiwg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1659509555454!5m2!1sbg!2sbg"
						width="100%"
						height="80%"
						title="map"
					></iframe>
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
