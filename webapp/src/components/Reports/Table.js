import React from 'react';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';

import ReportsRow from './ReportsRow';
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const FlexRow = styled('div')({
	display: 'flex',
	justifyContent: 'space-between'
});


export const BorderedCell = withStyles((theme) => ({

	body: {
		fontSize: 14,
		border: '1px solid lightgray'
	},
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: 'lightgray',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const BorderedDiv = styled('div')({
	display: 'flex',
	border: '1px solid lightgray',
	alignItems: 'center'
});



export default function ReportsTable({reportTasks,onViewTask,onApproveTask}) {
	const classes = useStyles();


	return (
		 <div className="reports__table">
			{/*Container Heading  */}
			<h4 className="heading">Task Board</h4>

			<div className="reports__table__main">

				<div className="table__head">
					<p>Name</p>
					<p>Task Description</p>
					<p>Project Detail</p>
					<p>Time/Date</p>
					<p>Actions</p>
				 </div>

				{/* Reports Main  */}

					{reportTasks.map((row,index) => (
						<ReportsRow task={row} key={index} onViewTask={onViewTask} onApproveTask={onApproveTask}/>
					))}
		</div>
		</div>
	);
}
