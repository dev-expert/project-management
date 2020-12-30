import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DollarIcon from '@material-ui/icons/AttachMoney'
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const Space = () => {
	return (
		<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
}

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

const rows = [
	createData('Project Management Tool', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Email Marketing', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Noteworthy', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Rediminds', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Rediminds', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Froloa', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
	createData('Tern', "Creating Mockup for dashboard", "09:30 - 07:00", "03:00"),
];

export default function BasicTable() {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Today</StyledTableCell>
						<StyledTableCell align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
						<StyledTableCell align="right">Non Billable: 03:00</StyledTableCell>
						<StyledTableCell align="right">&nbsp;</StyledTableCell>
						<StyledTableCell align="right">Billable: 05:30</StyledTableCell>
						<StyledTableCell align="right">Total : 8:30</StyledTableCell>
						<StyledTableCell align="right"><CreateIcon /></StyledTableCell>

					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<BorderedCell align="left"><DollarIcon />
							</BorderedCell>
							<BorderedCell component="th" align="left" scope="row">
								{row.name}
							</BorderedCell>
							<BorderedCell align="left">{row.description} &nbsp;&nbsp;&nbsp;&nbsp;<CreateIcon /> </BorderedCell>
							<BorderedCell align="right">{row.duration} &nbsp;&nbsp;&nbsp;&nbsp;<DateRangeIcon /></BorderedCell>
							<BorderedCell align="right"><Space />
								<Space /><Space />
								<Space />{row.total} &nbsp;&nbsp;&nbsp;&nbsp; <PlayArrowOutlinedIcon />
							</BorderedCell>
							<BorderedCell align="right"><MoreVertOutlinedIcon /></BorderedCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
