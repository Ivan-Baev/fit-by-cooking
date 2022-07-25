import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import Header from './components/Header/Header';
import Notification from './components/common/Notification';

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<NotificationProvider>
					<Notification />
					<Header />
					{/*  About Section  */}
					<div id="about" className="container-fluid wow fadeIn" data-wow-duration="1.5s">
						<div className="row">
							<div className="col-lg-6 has-img-bg" />
							<div className="col-lg-6">
								<div className="row justify-content-center">
									<div className="col-sm-8 py-5 my-5">
										<h2 className="mb-4">About Us</h2>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, quisquam accusantium nostrum modi, nemo, officia veritatis ipsum facere maxime assumenda voluptatum enim!
											Labore maiores placeat impedit, vero sed est voluptas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita alias dicta autem, maiores doloremque quo perferendis, ut
											obcaecati harum, <br />
											<br />
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum necessitatibus iste, nulla recusandae porro minus nemo eaque cum repudiandae quidem voluptate magnam voluptatum?{' '}
											<br />
											Nobis, saepe sapiente omnis qui eligendi pariatur. quis voluptas. Assumenda facere adipisci quaerat. Illum doloremque quae omnis vitae.
										</p>
										<p>
											<b>Lonsectetur adipisicing elit. Blanditiis aspernatur, ratione dolore vero asperiores explicabo.</b>
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ab itaque modi, reprehenderit fugit soluta, molestias optio repellat incidunt iure sed deserunt nemo magnam rem
											explicabo vitae. Cum, nostrum, quidem.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*  gallary Section  */}
					<div id="gallery" className="text-center bg-dark text-light has-height-md middle-items wow fadeIn">
						<h2 className="section-title">OUR MENU</h2>
					</div>
					<div className="gallary row">
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-1.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-2.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-3.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-4.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-5.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-6.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-7.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-8.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-9.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-10.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-11.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
						<div className="col-sm-6 col-lg-3 gallary-item wow fadeIn">
							<img src="assets/imgs/gallary-12.jpg" alt="template by DevCRID http://www.devcrud.com/" className="gallary-img" />
							<a href="#" className="gallary-overlay">
								<i className="gallary-icon ti-plus" />
							</a>
						</div>
					</div>
					{/* BLOG Section  */}
					<div id="top-choices" className="container-fluid bg-dark text-light py-5 text-center wow fadeIn">
						<h2 className="section-title py-5">EVENTS AT THE FOOD HUT</h2>
						<div className="row justify-content-center">
							<div className="col-sm-7 col-md-4 mb-5">
								<ul className="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#foods" role="tab" aria-controls="pills-home" aria-selected="true">
											Foods
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#juices" role="tab" aria-controls="pills-profile" aria-selected="false">
											Juices
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="tab-content" id="pills-tabContent">
							<div className="tab-pane fade show active" id="foods" role="tabpanel" aria-labelledby="pills-home-tab">
								<div className="row">
									<div className="col-md-4">
										<div className="card bg-transparent border my-3 my-md-0">
											<img src="assets/imgs/blog-1.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$5
													</a>
												</h1>
												<h4 className="pt20 pb20">Reiciendis Laborum </h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="card bg-transparent border my-3 my-md-0">
											<img src="assets/imgs/blog-2.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$12
													</a>
												</h1>
												<h4 className="pt20 pb20">Adipisci Totam</h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="card bg-transparent border my-3 my-md-0">
											<img src="assets/imgs/blog-3.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$8
													</a>
												</h1>
												<h4 className="pt20 pb20">Dicta Deserunt</h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="tab-pane fade" id="juices" role="tabpanel" aria-labelledby="pills-profile-tab">
								<div className="row">
									<div className="col-md-4 my-3 my-md-0">
										<div className="card bg-transparent border">
											<img src="assets/imgs/blog-4.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$15
													</a>
												</h1>
												<h4 className="pt20 pb20">Consectetur Adipisicing Elit</h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
									<div className="col-md-4 my-3 my-md-0">
										<div className="card bg-transparent border">
											<img src="assets/imgs/blog-5.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$29
													</a>
												</h1>
												<h4 className="pt20 pb20">Ullam Laboriosam</h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
									<div className="col-md-4 my-3 my-md-0">
										<div className="card bg-transparent border">
											<img src="assets/imgs/blog-6.jpg" alt="template by DevCRID http://www.devcrud.com/" className="rounded-0 card-img-top mg-responsive" />
											<div className="card-body">
												<h1 className="text-center mb-4">
													<a href="#" className="badge badge-primary">
														$3
													</a>
												</h1>
												<h4 className="pt20 pb20">Fugit Ipsam</h4>
												<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa provident illum officiis fugit laudantium voluptatem sit iste delectus qui ex. </p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* CONTACT Section  */}
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
										info@website.com
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* page footer  */}
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
								<p className="text-muted">12345 Fake ST NoWhere AB Country</p>
							</div>
						</div>
					</div>
					<div className="bg-dark text-light text-center border-top wow fadeIn">
						<p className="mb-0 py-3 text-muted small">
							© Copyright Made with <i className="ti-heart text-danger" /> By <a href="http://fitbycooking.com">Fit By Cooking</a>
						</p>
					</div>
				</NotificationProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
