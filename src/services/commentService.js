const baseUrl = 'https://fit-by-cooking-server.herokuapp.com/data/';

export const createComment = async (recipeId, content, author, authToken) => {
	const response = await fetch(`${baseUrl}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			recipeId,
			content,
			author,
		}),
	});

	return await response.json();
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

export const getCommentById = async (commentId) => {
	const response = await fetch(`${baseUrl}/comments/${commentId}`);
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const editComment = async (commentId, content, authToken) => {
	const response = await fetch(`${baseUrl}/comments/${commentId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify({
			content,
		}),
	});

	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const deleteComment = async (commentId, authToken) => {
	const response = await fetch(`${baseUrl}/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
	});

	return await response.json();
};
