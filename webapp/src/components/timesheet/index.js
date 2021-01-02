import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

import DollarIcon from '@material-ui/icons/AttachMoney'
import Button from '@material-ui/core/Button';
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
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import getConnect from '../Common/connect';




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


const Index = ({ getTasks, getProjects, tasks, projects, addTask }) => {
	const [title, setTitle] = useState('Test Title');
	const [description, setDescription] = useState('Test description');
	const [projectId, setProjectId] = useState(1);
	const [isBillable, setIsBillable] = useState(false);
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [clockedTime, setClockedTime] = useState(0);
	const [submittedBy, setSubmittedBy] = useState(3);
	const [isTracking, setIsTracking] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	useEffect(() => {
		getProjects();
		getTasks();

		let startTime= localStorage.getItem('startTime')
        let currentTime= new Date().getTime();
        let clocked_time = Math.floor((currentTime - Number(startTime))/1000)
        
        if(startTime){
            let d = new Date()
			d.setTime(Number(startTime))
			setCheckIn(d)
			setClockedTime(clocked_time)
			setIsTracking(true)
			startTimer()
            
        }

	  }, [getTasks])

	  const formatTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
	  }

	  const startTimer =  () => {
        let interval= setInterval(() => {
			handleTimer();
		}, 1000);
		setIntervalId(interval)
	}

	const handleTimer = () => {
		setClockedTime(clockedTime => {
			return clockedTime + 1
		})
	}
	
	const handleSubmit= async () => {
        if(!isTracking){
            let currentTime = new Date();
			localStorage.setItem("startTime", currentTime.getTime())
			setIsTracking(true)
			setCheckIn(currentTime)
          	startTimer()
        }else{
            // let description_error = '';
            // let project_error = '';

            // description_error= description === '' ? 'Add description' : ''
            // project_error= projectId === 0 ? 'Select Project' : ''

            // this.setState({
            //     errors: {
            //         description: description_error,
            //         project: project_error
            //     }
            // })

            // if(this.state.description === '' || this.state.project === 0){
            //     return false;
            // }
            clearInterval(intervalId)
			let currentTime = new Date();
			setIsTracking(false)
			setCheckOut(currentTime)
            localStorage.removeItem("startTime");
            setTimeout( async () => {
                let payLoad= {
                    "description": description,
                    "project_id": projectId,
                    "start_datetime": checkIn,
                    "end_datetime": currentTime,
                    "clocked_time": clockedTime,
                    "is_billable": isBillable,
                    "user_id": submittedBy
                }
			   addTask(payLoad);
			   setClockedTime(0)
            }, 500);
        }
    }
	return (
		<div className="timesheet">
			<div>
				<div className="">
					<TableContainer component={Paper}>
			<Table  aria-label="simple table">
					<TableHead>
						<TableRow>
							<BorderedCell align="left">
								<Checkbox
									icon={<DollarIcon />}
									checkedIcon={<DollarIcon />}
									onChange={(e) => setIsBillable(e.target.checked)}
									name="isBillable"
								/>
							</BorderedCell>
							<BorderedCell align="center">
							<ControlPointOutlinedIcon />&nbsp;&nbsp;&nbsp; <span htmlFor="age-native-simple">Select Project</span>
							</BorderedCell>

							<BorderedCell align="center">
								<div
								style={{display:'flex',justifyContent:'space-between'}}
								>
									What are you working  <DescriptionIcon />
									</div>
							</BorderedCell>
							<BorderedCell align="center">{formatTime(clockedTime)}</BorderedCell>
							<BorderedCell align="center"><Button variant="contained"

								startIcon={<StartIcon />}
								// color="#000000"
								onClick={ () => handleSubmit()}
							>
								{isTracking ? 'Stop' : 'Start'}
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
					<TimeSheetTable tasks={tasks}/>
				</div>
			</div>


		</div>

	)
}

export default getConnect(Index)
