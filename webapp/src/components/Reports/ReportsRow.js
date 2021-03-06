import React, { useState, useEffect } from 'react'

import TableCell from '@material-ui/core/TableCell';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { getComments, addComment, updateComment } from '../../actions/commentActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


import Comments from '../Timesheet/Comments';


const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0px 10px'
});
const ITEM_HEIGHT = 48;

const BorderedDiv = styled('div')({
	display: 'flex',
	border: '1px solid lightgray',
	alignItems: 'center'
});



const Separator = styled('span')(
	{
		height: '6px',
		width: '6px',
		backgroundColor: "#bbb",
		borderRadius: '50%',
		display: 'inline-block',
		margin: '0 6px'
	}
)

export const BorderedCell = withStyles((theme) => ({

	body: {
		fontSize: 14,
		border: '1px solid lightgray'
	},
}))(TableCell);



const TaskRow = ({ task, onViewTask, onApproveTask }) => {
	const [showComments, setShowComments] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [comments, setComments] = useState([]);


	const toggleCommentsView = () => {
		setShowComments((showComments => !showComments));
	}

	// Fetch comments for given time entry
	const fetchComments = async () => {
		const comments = await getComments({ timeEntryId: task.id });
		if (comments) {
			setComments(comments.data);
		}
	}

	// Update comment to soft delete
	const handleDeleteComment = async (id) => {
		await updateComment(id, { active: false });
		fetchComments();
	}

	const handleAddComment = async (comment, onCommentSuccess) => {
		const payload = {
			comment,
			timeEntryId: task.id,
			active: true,
		}
		const response = await addComment(payload);
		if (response.status === 200) {
			onCommentSuccess();
			fetchComments();
		}

	}





	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const approveTask = () => {
		onApproveTask(task.id);
	}

	const getDuration = (start, end) => {
		const duration = moment.duration(moment(end).diff(moment(start)));
		if (!duration._isValid) {
			return '';
		} else {
			const { _data } = duration
			return `${_data.hours || '00'}:${_data.minutes || '00'}:${_data.seconds || '00'}`
		}
	}

	const getTime = (start, end) => {
		if (!start || !end) {
			return 'Invalid date';
		}
		return `${moment(start).format('hh:mm A')}  ${moment(end).format('hh:mm A')}
									${moment(start).format('MM/DD/YYYY')}`
	}
	return (
		<>
			{/* Report Row */}
			<div className="report">
				{/* User Name */}
				<div className="user">
					{task.userInfo.firstName} {task.userInfo.lastName}
				</div>
				{/* Task description */}
				<div className="description">
					{task.description}
				</div>
				{/* Project detail */}
				<div className="project">
					{task.Projects.name}
				</div>

				{/* TIme /duration */}
				<div className="time">
					{getTime(task.startedAt, task.completedAt)}
					{getDuration(task.startedAt, task.completedAt)}
				</div>

				{/* Actions */}
				<div className="actions">

					{/* Approved */}
					<div className="approve">
						{
							task.approvedStatusId !== 1 ? (
								<Button variant="contained" onClick={approveTask} style={{backgroundColor:'rgba(255, 92, 0, 0.8)', width:'92px'}}>Approve</Button>
							) : (
									<Button variant="contained"  style={{backgroundColor:'#3AC47D',width:'92px', color:'white'}}  >Approved</Button>
								)
						}
					</div>

					{/* Comments */}
					<div>
					 <IconButton onClick={toggleCommentsView}>
						<Badge badgeContent={task.comments.length} color="secondary">
							<CommentIcon />
						</Badge>
					</IconButton>
					</div>


					{/* Visible */}
					<div>
						<Button onClick={() => onViewTask(task)}><VisibilityIcon /></Button>
					</div>

				</div>
			</div>
			<div>
				{showComments && <Comments
					timeEntryId={task.id}
					deleteComment={handleDeleteComment}
					addComment={handleAddComment}
					comments={comments} />}
			</div>
		</>
	)
}

export default TaskRow
