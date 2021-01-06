import React from 'react';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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



export default function BasicTable({tasks,onViewTask}) {
	const classes = useStyles();


	return (
		<TableContainer component={Paper}>

					<>
			<div style={{ display: 'flex' }}>
				<div style={{ display: 'flex', width: '50%',padding:'10px' }}>
					<div  style={{ flex: 1 }}>
						Time Entry
						</div>
				</div>
				<div style={{ width: '50%', padding:'10px' }}>
						<div style={{ display: 'flex', flex: 1,
									padding: '0 5px 0px 30px',
									justifyContent: 'space-between',
									alignItems: 'center' }} >
							<FlexRow>
								User
							</FlexRow>
							<FlexRow>
								Time
							</FlexRow>
							<FlexRow>
								Duration
							</FlexRow>
							<FlexRow>
							</FlexRow>
						</div>
				</div>
			</div>
			<div>
					{/* {showComments && <Comments />} */}
				</div>
		</>

				<div>
					{tasks.map((row) => (
						<ReportsRow task={row} onViewTask={onViewTask}/>
					))}
				</div>

		</TableContainer>
	);
}
