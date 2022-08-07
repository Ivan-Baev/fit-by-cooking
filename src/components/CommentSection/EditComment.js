import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import * as commentService from '../../services/commentService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const EditComment = ({ commentData, toggleIsBeingEdited }) => {
	const { user } = useContext(AuthContext);
	const [isValid, setIsValid] = useState({ errors: {} });
	const submitEl = useRef(null);
	const { addNotification } = useNotificationContext();

	const onCommentSubmitHandler = (e) => {
		e.preventDefault();

		const errors = {};
		const formData = new FormData(e.target);
		const commentText = formData.get('comment');
		if (commentText.length < 5) {
			errors['comment'] = 'Comment should not be empty';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			commentService
				.editComment(commentData._id, commentText, user.accessToken)
				.then((res) => {
					addNotification('Comment edited successfully!', types.success);
				})
				.catch((error) => console.log(error));
			toggleIsBeingEdited(true);
		}
	};

	const toggleIsBeingEditedAndSubmit = () => {
		toggleIsBeingEdited(true);
		submitEl.current.click();
	};

	const onCommentChangeHandler = (e) => {
		let errors = {};
		if (e.target.value.length > 5) {
			errors['comment'] = null;
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		} else {
			errors['comment'] = 'Comment should not be empty';
			setIsValid((oldIsValid) => {
				return { ...oldIsValid, ...{ errors: errors } };
			});
		}
	};

	return (
		<>
			<div className="single-post__comment__item mb-4" style={{ borderBottom: 'inset' }}>
				<div className="single-post__comment__item__pic">
					<img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
				</div>
				<div className="single-post__comment__item__text">
					<h6>{commentData.author}</h6>
					<span>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(commentData._createdOn)}</span>
					<form onSubmit={onCommentSubmitHandler} method="POST">
						<input
							onChange={onCommentChangeHandler}
							style={{ width: '100%' }}
							name="comment"
							defaultValue={commentData.comment}
							className="text-justify edit-comment-input comment-text mb-0"
							autoFocus
						/>
						{isValid.errors['comment'] && <p className="text-danger">Comment should be at least 6 symbols!</p>}
						<button ref={submitEl} type="submit" style={{ display: 'none' }} />
					</form>
					{user._id && user._id === commentData._ownerId ? (
						<>
							<ul>
								<li>
									<div style={{ display: 'flex', flexDirection: 'row' }} className="gallary-item wow fadeIn">
										<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Submit editted comment!</Tooltip>}>
											<span style={{ marginRight: '15px' }} id="clickableSpan" onClick={toggleIsBeingEditedAndSubmit}>
												<i className="far fa-share-square fa-2x" style={{ color: 'blue' }}></i>
											</span>
										</OverlayTrigger>
										<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Undo!</Tooltip>}>
											<span id="clickableSpan" onClick={toggleIsBeingEdited}>
												<i className="fas fa-undo fa-2x" style={{ color: 'black' }}></i>
											</span>
										</OverlayTrigger>
									</div>
								</li>
							</ul>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default EditComment;
