const baseUrl = 'http://localhost:3030/data';

export const addToFavorites = async (recipeId, userId, authToken) => {
	const response = await fetch(`${baseUrl}/favorites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			recipeId,
			userId,
		}),
	});

	return await response.json();
};

export const getAllFavoritedByUserId = async (userId) => {
	const query = encodeURIComponent(`userId="${userId}"`);
	const relations = encodeURIComponent(`recipes=recipeId:recipes`);
	const response = await fetch(`${baseUrl}/favorites?where=${query}&load=${relations}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getOneFavoritedByUserId = async (recipeId, userId) => {
	const query1 = encodeURIComponent(`userId="${userId}"`);
	const query2 = encodeURIComponent(`recipeId="${recipeId}"`);
	const response = await fetch(`${baseUrl}/favorites?where=${query1}&where=${query2}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const removeFromFavorites = async (favoriteId, authToken) => {
	const response = await fetch(`${baseUrl}/favorites/${favoriteId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
	});

	return await response.json();
};
