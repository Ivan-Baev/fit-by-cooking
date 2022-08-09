import { useState, useContext, useEffect } from 'react';
import * as commentService from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import EditComment from './EditComment';
import ConfirmModal from '../common/Modal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function CommentCard({ comment }) {
	const { user } = useContext(AuthContext);
	const { addNotification } = useNotificationContext();

	const [commentData, setCommentData] = useState(comment);
	const [isDeleted, setIsDeleted] = useState(false);
	const [deletionModal, setDeletionModal] = useState(false);
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [edited, setEdited] = useState(false);

	useEffect(() => {
		if (edited) {
			commentService
				.getCommentById(comment._id)
				.then((res) => setCommentData(res))
				.catch((error) => {
					console.log(error);
				});
		}
	}, [comment._id, edited, commentData]);

	const onDeleteHandler = () => {
		commentService
			.deleteComment(commentData._id, user.accessToken)
			.then((res) => {
				addNotification('Comment successfully deleted!', types.danger);
				setIsDeleted((oldIsDelete) => !oldIsDelete);
			})
			.catch((error) => console.log(error));
	};

	const toggleDeletionModal = () => {
		setDeletionModal((oldDeletionModal) => !oldDeletionModal);
	};

	const toggleIsBeingEdited = (alreadyEdited = false) => {
		setIsBeingEdited((oldIsBeingEdited) => !oldIsBeingEdited);
		if (alreadyEdited) {
			setEdited(true);
			setTimeout(() => {
				setEdited(false);
			}, 1);
		}
	};

	return isDeleted ? null : isBeingEdited ? (
		<EditComment toggleIsBeingEdited={toggleIsBeingEdited} commentData={commentData} />
	) : (
		<>
			<ConfirmModal show={deletionModal} onClose={toggleDeletionModal} onSave={onDeleteHandler} />
			<div className="single-post__comment__item mb-4" style={{ borderBottom: 'inset' }}>
				<div className="single-post__comment__item__pic">
					<img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
				</div>
				<div className="single-post__comment__item__text">
					<h6>{commentData.author}</h6>
					<span>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(commentData._createdOn)}</span>
					<p>{commentData.content}</p>
					{user._id && user._id === commentData._ownerId ? (
						<>
							<ul>
								<li>
									<div style={{ display: 'flex', flexDirection: 'row' }} className="gallary-item wow fadeIn">
										<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit comment!</Tooltip>}>
											<span style={{ marginRight: '10px' }} id="clickableSpan" onClick={toggleIsBeingEdited}>
												<i className="fas fa-edit fa-2x" style={{ color: 'green' }}></i>
											</span>
										</OverlayTrigger>
										<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete post!</Tooltip>}>
											<span id="clickableSpan" onClick={toggleDeletionModal}>
												<i className="fas fa-ban fa-2x" style={{ color: 'red' }}></i>
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
}

export default CommentCard;
