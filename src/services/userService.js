const baseUrl = 'http://localhost:3030';

export const createUser = async (userData, authToken) => {
	const response = await fetch(`${baseUrl}/data/profiles`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify(userData),
	});
	return await response.json();
};

export const editUser = async (userId, authToken, userData) => {
	const response = await fetch(`${baseUrl}/data/profiles/${userId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': authToken,
		},
		body: JSON.stringify(userData),
	});
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};

export const getUser = async (authToken, ownerId) => {
	const response = await fetch(`${baseUrl}/data/profiles?where=_ownerId%3D%22${ownerId}%22`, {
		headers: {
			'X-Authorization': authToken,
		},
	});
	const result = await response.json();

	if (response.ok) {
		return result;
	} else {
		throw result.message;
	}
};
