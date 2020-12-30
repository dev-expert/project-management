import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

import DollarIcon from '@material-ui/icons/AttachMoney'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import StartIcon from '@material-ui/icons/PlayArrow';
import ListIcon from '@material-ui/icons/List';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import ClockIcon from '@material-ui/icons/QueryBuilder';
import DescriptionIcon from '@material-ui/icons/Description';
import TimeSheetTable from './Table';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import CreateIcon from '@material-ui/icons/Create';
import TableRow from '@material-ui/core/TableRow';

const BorderedCell = withStyles((theme) => ({
	head:{
		border:'1px solid lightgray'
	},
	body: {
		fontSize: 14,
		background:'red',
		border:'1px solid lightgray'
	},
}))(TableCell);


const Index = () => {

	return (
		<div className="timesheet">
			<div>
				<div className="">
					<TableContainer component={Paper}>
			<Table  aria-label="simple table">
					<TableHead>
						<TableRow>
							<BorderedCell align="left">	<DollarIcon /></BorderedCell>
							<BorderedCell align="center">
							<ControlPointOutlinedIcon />&nbsp;&nbsp;&nbsp; <span htmlFor="age-native-simple">Select Project</span>
							</BorderedCell>

							<BorderedCell align="center">
								<Input
									id="standard-adornment-weight"
									value=""
									onChange=""
									placeholder="What are you working"
									endAdornment={<InputAdornment position="end"><DescriptionIcon /></InputAdornment>}

								/>
							</BorderedCell>
							<BorderedCell align="center">00:00</BorderedCell>
							<BorderedCell align="center"><Button variant="contained"

								startIcon={<StartIcon />}
								color="#000000"
							>
								Start
      					</Button></BorderedCell>

							<BorderedCell align="center">
								<ClockIcon />
								<br/>
								<ListIcon />
							</BorderedCell>

						</TableRow>
					</TableHead>
					</Table>
					</TableContainer>
				</div>

				<div className="timesheet__table">
					<TimeSheetTable />
				</div>
			</div>


		</div>

	)
}

export default Index
