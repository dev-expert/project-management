import React from 'react';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import CommentIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import ErrorIcon from '@material-ui/icons/Error';
import Comments from './Comments';
import TaskRow from './TaskRow';
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




function createData(name, description, duration, total, protein) {
	return { name, description, duration, total, protein };
}


export default function BasicTable({tasks}) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<div className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Today</StyledTableCell>
						<StyledTableCell align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
						<StyledTableCell align="right">Non Billable: 03:00 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
						<StyledTableCell align="right"><FlexRow>Billable: 05:30  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total : 8:30 <CreateIcon /></FlexRow></StyledTableCell>

					</TableRow>
				</TableHead>
				<div>
					{tasks.map((row) => (
						<TaskRow task={row} />
					))}
				</div>
			</div>
		</TableContainer>
	);
}
