import React, { useState,useEffect } from 'react'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import Comments from './Comments';
// import {addComment,getComments} from '../../actions/commentActions';
import {getComments,addComment,updateComment} from '../../actions/commentActions';

const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems:'center',
	padding:'0px 10px'
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



const TaskRow = ({ task }) => {
	const [showComments, setShowComments] = useState(false);
	const [comments,setComments] = useState([]);


	const toggleCommentsView = () => {
		setShowComments((showComments => !showComments));
	}



	const fetchComments = async () => {
	      const comments = await getComments({timeEntryId: task.id});
		  if(comments) {
		   setComments(comments.data);
		  }
		}

	useEffect(() => {
		fetchComments();
	},[task.id]);

	const handleDeleteComment = async (id) => {
		await updateComment(id,{isDeleted:true});
		fetchComments();
	}

	const handleAddComment = async (comment) => {
		const payload = {
			comment,
			timeEntryId: task.id,
			active:true,
		}
		await addComment(payload);
		fetchComments();
	}




	return (
		<>
			<div style={{ display: 'flex' }}>
				<BorderedDiv align="left"><DollarIcon /></BorderedDiv>
				<div key={task.name} style={{ display: 'flex', width: '70%' }}>
					<BorderedDiv style={{ flex: 1 }}>
						<FlexRow>{task.Projects.name}</FlexRow>
					</BorderedDiv>
					<BorderedDiv align="left" style={{ flex: 1 }}><FlexRow>{task.description} <CreateIcon /></FlexRow></BorderedDiv>
				</div>
				<div style={{ width: '50%' }}>
					<BorderedDiv>
						<div style={{ display: 'flex', flex: 1, padding: '0 5px 0px 30px', justifyContent: 'space-between', alignItems: 'center' }} >

							<FlexRow>
								{task.startedAt || "00:00" }
								<DateRangeIcon />
							</FlexRow>
							<FlexRow>
								{task.completedAt || "00:00"}
								<PlayArrowOutlinedIcon />
							</FlexRow>

							<FlexRow>
								<IconButton onClick={toggleCommentsView}>
									<Badge badgeContent={comments.length} color="secondary">
										<CommentIcon />
									</Badge>
								</IconButton>
								<MoreVertOutlinedIcon />
								<ErrorIcon color="secondary" />
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
					  comments={comments}/>}
				</div>
		</>
	)
}

export default TaskRow
