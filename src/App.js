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

function App() {
	return (
		<div className="App">
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
							{/* <Route path="/my-profile" element={<Profile />} />
							<Route path="/my-recipes" element={<MyRecipes />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/:recipeId/edit" element={<Edit />} /> */}
						</Route>
					</Routes>

					<Footer />
				</NotificationProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
