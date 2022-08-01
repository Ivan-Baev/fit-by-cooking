const baseUrl = 'http://localhost:3030/data';

export const getAllRecipes = async () => {
	const response = await fetch(`${baseUrl}/recipes`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getRecentRecipes = async () => {
	const response = await fetch(`${baseUrl}/recipes?sortBy=_createdOn%20desc`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getRecipesByOwnerId = async (ownerId) => {
	const query = encodeURIComponent(`_ownerId="${ownerId}"`);
	const response = await fetch(`${baseUrl}/recipes?where=${query}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getRecipeById = async (recipeId) => {
	const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const createRecipe = async (recipeData, authToken) => {
	const response = await fetch(`${baseUrl}/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			...recipeData,
		}),
	});

	return await response.json();
};

export const editRecipe = async (recipeId, recipeData, authToken) => {
	const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			...recipeData,
		}),
	});

	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const deleteRecipe = async (recipeId, authToken) => {
	const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
	});

	return await response.json();
};
