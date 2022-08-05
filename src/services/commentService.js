const baseUrl = 'http://localhost:3030/data/';

export const create = async (recipeId, comment, authToken) => {
	const response = await fetch(`${baseUrl}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			recipeId,
			comment,
		}),
	});

	return await response.json();
};

export const getCommentsByRecipeId = async (recipeId) => {
	const relations = encodeURIComponent(`user=_ownerId:users`);
	const search = encodeURIComponent(`gameId="${recipeId}"`);

	const response = await fetch(`${baseUrl}?where=${search}&load=${relations}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getAllCommentsByRecipeId = async (recipeId) => {
	const query = encodeURIComponent(`recipeId="${recipeId}"`);
	const response = await fetch(`${baseUrl}/comments?where=${query}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};
