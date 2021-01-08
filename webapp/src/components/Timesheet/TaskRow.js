import React, { useState, useEffect } from 'react'

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DollarIcon from '@material-ui/icons/AttachMoney'
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import Comments from './Comments';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TaskEntryModel from './TaskEntryModal';
import moment from 'moment';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { getComments, addComment, updateComment } from '../../actions/commentActions';

const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0px 10px'
});

const BorderedDiv = styled('div')({
	display: 'flex',
	border: '1px solid lightgray',
	alignItems: 'center'
});

export const BorderedCell = withStyles((theme) => ({

	body: {
		fontSize: 14,
		border: '1px solid lightgray'
	},
}))(TableCell);



const TaskRow = ({ task, updateTask }) => {
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [taskEditView, setTaskEditView] = useState();
	const [description, setDescription] = useState(task.description);
	const [modelOpen, setModelOpen] = useState(false);
	const [tmpTask, setTmpTask] = useState(task);
	const [startSelectedDate, setStartSelectedDate] = useState();
	const [endSelectedDate, setEndSelectedDate] = useState(new Date());


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

	const handleTaskSave = ({ id, description, videoLink, title }) => {
		updateTask(id, { id, description, videoLink, title })
		setModelOpen(false)
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



	return (
		<>
			<div style={{ display: 'flex' }}>
				<BorderedDiv align="left"><DollarIcon /></BorderedDiv>
				<div key={task.name} style={{ display: 'flex', width: '70%' }}>
					<BorderedDiv style={{ flex: 1 }}>
						<FlexRow>{task.Projects.name}</FlexRow>
					</BorderedDiv>
					<BorderedDiv align="left" style={{ flex: 1 }}>
						<FlexRow>
							<>
								{task.description}
								<Button onClick={() => setModelOpen(true)}><CreateIcon /></Button>
							</>


						</FlexRow>
					</BorderedDiv>
				</div>
				<div style={{ width: '50%' }}>
					<BorderedDiv>
						<div style={{ display: 'flex', flex: 1, padding: '0 5px 0px 30px', justifyContent: 'space-between', alignItems: 'center' }} >

							<FlexRow>
								{/* {startSelectedDate ? startSelectedDate : task.startedAt || "00:00"} */}
								<form  noValidate>
									<TextField
										id="datetime-local"
										type="datetime-local"
										onBlur={(e,d) => {
										if(moment(task.startedAt).isSame(e.target.value)) {
												return;
										}
											updateTask(task.id,{startedAt:e.target.value})
										}}
      								    defaultValue={moment(task.startedAt).format("YYYY-MM-DDTHH:mm")}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</form>
							</FlexRow>
							<FlexRow>
								<form  noValidate>
									<TextField
										id="datetime-local"
										type="datetime-local"
										onBlur={(e) => {
											if(moment(task.completedAt).isSame(e.target.value)) {
												return;
											}
											updateTask(task.id,{completedAt:e.target.value})
										}}
      								    defaultValue={moment(task.completedAt).format("YYYY-MM-DDTHH:mm")}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</form>
							</FlexRow>

							<FlexRow>
								<IconButton onClick={toggleCommentsView}>
									<Badge badgeContent={comments.length} color="secondary">
										<CommentIcon />
									</Badge>
								</IconButton>
								{
									task.approvedStatusId !== 1 ? (<ErrorIcon color="secondary" />) : (
										<CheckCircleOutlineIcon color="primary" style={{ color: 'green' }} />
									)
								}

							</FlexRow>
						</div>
					</BorderedDiv>
				</div>
			</div>
			<div>
				{showComments && <Comments
					timeEntryId={task.id}
					deleteComment={handleDeleteComment}
					addComment={handleAddComment}
					comments={comments} />}
			</div>
			<div>
				<TaskEntryModel
					open={modelOpen}
					editable={true}
					task={task}
					handleTaskSave={handleTaskSave}
					handleClose={() => setModelOpen(false)} />
			</div>
		</>
	)
}

export default TaskRow
