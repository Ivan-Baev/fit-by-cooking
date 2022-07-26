import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Notification from './components/common/Notification';
import Register from './components/Register/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import AnabolicCookbook from './components/AnabolicCookbook/AnabolicCookbook';
import GuardedRoute from './components/common/GuardedRoute';
import NotFound from './components/common/NotFound';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeEdit from './components/RecipeEdit/RecipeEdit';
import ScrollToTop from './components/common/ScrollToTop';
import UserProfile from './components/Profile/UserProfile';

function App() {
	return (
		<div className="App">
			<ScrollToTop>
				<AuthProvider>
					<NotificationProvider>
						<Notification />
						<Header />
						<Routes>
							<Route index element={<Home />} />
							<Route path="/register" element={<Register />} />
							<Route path="/cookbook" element={<AnabolicCookbook />} />
							<Route path="/cookbook/:recipeId/details" element={<RecipeDetails />} />
							<Route path="*" element={<NotFound />} />

							<Route element={<GuardedRoute />}>
								<Route path="/create-recipe" element={<RecipeCreate />} />
								<Route path="/cookbook/:recipeId/edit" element={<RecipeEdit />} />
								<Route path="/my-profile" element={<UserProfile />} />
								{/* <Route path="/my-recipes" element={<MyRecipes />} /> */}
							</Route>
						</Routes>

						<Footer />
					</NotificationProvider>
				</AuthProvider>
			</ScrollToTop>
		</div>
	);
}

export default App;
