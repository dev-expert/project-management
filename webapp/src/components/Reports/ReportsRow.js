import React, { useState } from 'react'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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



const TaskRow = ({ task,onViewTask }) => {
	const [showComments, setShowComments] = useState(false);
	 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
	console.log('task ', task);


	const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

	const getDuration = (start, end) => {
		const duration = moment.duration(moment(end).diff(moment(start)));
		if (!duration._isValid) {
			return '';
		} else {
			const { _data } = duration
			console.log('Duration: ', duration)
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

	const toggleCommentsView = () => {
		setShowComments((showComments => !showComments));
	}

	return (
		<>
			<div style={{ display: 'flex', padding: '10px 15px', borderBottom: '1px solid lightgray' }}>
				<div key={task.name} style={{ display: 'flex', width: '50%' }}>
					<div style={{ flex: 1 }}>
						{task.description} <Button onClick={() =>onViewTask(task)}><CreateIcon /></Button> <Separator />  {task.Projects.name}
					</div>
				</div>
				<div style={{ width: '50%' }}>
					<div>
						<div style={{
							display: 'flex', flex: 1,
							padding: '0 5px 0px 30px',
							justifyContent: 'space-between',
							alignItems: 'center'
						}} >
							<FlexRow>
								{task.userInfo.firstName} {task.userInfo.lastName}
							</FlexRow>
							<FlexRow>
								{getTime(task.startedAt, task.completedAt)}
							</FlexRow>
							{getDuration(task.startedAt, task.completedAt)}
							<FlexRow>

								<IconButton onClick={toggleCommentsView}>
									<Badge badgeContent={task.comments.length} color="secondary">
										<CommentIcon />
									</Badge>
								</IconButton>
								<div>
									<IconButton
										aria-label="more"
										aria-controls="long-menu"
										aria-haspopup="true"
										onClick={handleMenuClick}
									>
								<MoreVertOutlinedIcon />
									</IconButton>
									<Menu
										id="long-menu"
										anchorEl={anchorEl}
										keepMounted
										open={open}
										onClose={handleMenuClose}
										PaperProps={{
											style: {
												maxHeight: ITEM_HEIGHT * 4.5,
												width: '20ch',
											},
										}}
									>
											<MenuItem
													onClick={handleMenuClose}>
												Approve
											</MenuItem>
									</Menu>
								</div>
							</FlexRow>
						</div>
					</div>
				</div>
			</div>
			<div>
				{showComments && <Comments />}
			</div>
		</>
	)
}

export default TaskRow
