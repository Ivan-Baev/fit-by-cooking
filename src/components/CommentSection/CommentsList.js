import { useContext, useState, useRef, useEffect } from 'react';
import * as commentService from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import Comment from './CommentsCard';

function CommentSection({ recipeId }) {
	const { user } = useContext(AuthContext);
	const { addNotification } = useNotificationContext();
	const [comments, setComments] = useState({});
	const [isValid, setIsValid] = useState({ errors: {} });
	const commentRef = useRef(null);
	useEffect(() => {
		commentService
			.getAllCommentsByRecipeId(recipeId)
			.then((result) => {
				setComments(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [recipeId]);

	const onCommentSubmitHandler = (e) => {
		e.preventDefault();
		const errors = {};
		const formData = new FormData(e.target);
		const commentText = formData.get('comment');
		if (commentText.length < 6) {
			errors['comment'] = 'Comment should not be empty';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			commentService
				.createComment(recipeId, commentText, user.username, user.accessToken)
				.then((res) => {
					commentService
						.getAllCommentsByRecipeId(recipeId)
						.then((fetchedComments) => {
							setComments(fetchedComments);
							addNotification(`Successfully posted comment!`, types.success);
						})
						.catch((error) => {
							console.log(error);
						});
					commentRef.current.value = '';
				})
				.catch((error) => console.log(error));
		}
	};

	const onCommentChangeHandler = (e) => {
		let errors = {};
		if (e.target.value.length > 5) {
			errors['comment'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		}
	};

	return (
		<div className="single-post__leave__comment">
			<div className="widget__title mb-3">
				<h4>Leave a comment</h4>
			</div>
			{user.email ? (
				<form onSubmit={onCommentSubmitHandler} style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type="text"
						className={isValid.errors['comment'] ? 'form-control notValid mr-2' : 'form-control mr-2'}
						name="comment"
						ref={commentRef}
						onChange={onCommentChangeHandler}
						placeholder="Enter your comment..."
					/>

					<button style={{ padding: '7px 7px', borderRadius: '10px', width: '20%' }} type="submit" className="btn btn-danger">
						Submit
					</button>
				</form>
			) : (
				<p>Sign in to be able to comment...</p>
			)}
			{isValid.errors['comment'] && <p className="mt-0 text-danger">Comment should be at least 6 characters!</p>}
			<div className="mt-3 widget__title">
				<h4>Comments</h4>
			</div>
			{comments.length > 0 ? (
				comments.sort((c1, c2) => new Date(c2._createdOn) - new Date(c1._createdOn)).map((comment) => <Comment key={comment._id} comment={comment} />)
			) : (
				<p>There are currently no comments. Be the first to comment..</p>
			)}
		</div>
	);
}

export default CommentSection;
