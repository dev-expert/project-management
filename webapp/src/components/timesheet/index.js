import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import TaskEntryModel from './TaskEntryModal';

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
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';
  import { toast } from 'react-toastify';
  

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const BorderedCell = withStyles((theme) => ({
	head: {
		border: '1px solid lightgray'
	},
	body: {
		fontSize: 14,
		background: 'red',
		border: '1px solid lightgray'
	},
}))(TableCell);


const Index = ({ getTasks, getProjects, tasks, projects, addTask, updateTask, getTask, getInProgressTask, task }) => {
	const [title, setTitle] = useState('Test Title');
	const [projectId, setProjectId] = useState(0);
	const [isBillable, setIsBillable] = useState(false);
	const [checkIn, setCheckIn] = useState();
	const [checkOut, setCheckOut] = useState();
	const [clockedTime, setClockedTime] = useState(0);
	const [submittedBy, setSubmittedBy] = useState(3);
	const [isTracking, setIsTracking] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const [open, setOpen] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);
	const [project, setProject] = useState();
	const [taskDetail, setTaskDetail] = useState('');
	const [projectError, setProjectError] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [startTime, setStartTimeDate] = useState(new Date());
	const [endTime, setEndTimeDate] = useState(new Date());
	const [isManual, setIsManual] = useState(false);
	useEffect(() => {
		getProjects();
		getTasks();
	}, [getTasks])

	useEffect(() => {
		// Fetch INPROGRESS Task,
		getInProgressTask();
	}, []);

	useEffect(() => {
		if (projects && projects[0] && task && task.id) {
			let currentProject = projects[0].data.find(p => p.id == task.projectId)
			setProject(currentProject)
			setProjectId(task.projectId)
			let startTime = new Date(task.startedAt).getTime()
			let currentTime = new Date().getTime();
			let clockedTime = Math.floor((currentTime - Number(startTime)) / 1000)
	
			if (startTime && !isTracking && !isManual) {
				setTaskDetail(task)
				setClockedTime(clockedTime)
				setIsTracking(true)
				startTimer()
				setCheckIn(task.startedAt)
				setIsBillable(task.isBillable)
			}
		}
		
	}, [task, projects]);


	const formatTime = (timer) => {
		const getSeconds = `0${(timer % 60)}`.slice(-2)
		const minutes = `${Math.floor(timer / 60)}`
		const getMinutes = `0${minutes % 60}`.slice(-2)
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

		return `${getHours} : ${getMinutes} : ${getSeconds}`
	}

	const startTimer = () => {
		let interval = setInterval(() => {
			handleTimer();
		}, 1000);
		setIntervalId(interval)
	}

	const handleTimer = () => {
		setClockedTime(clockedTime => {
			return clockedTime + 1
		})
	}

	const handleSubmit = async () => {
		let project_error = '';

		project_error= projectId === 0 ? 'Select Project' : ''

		setProjectError(project_error)
		if(projectId === 0){
			return false;
		}

		if(isManual){
			let clocked_time=0
			let selected_date= new Date(selectedDate)
			let selected_starttime= new Date(startTime)
			let selected_endtime= new Date(endTime)
			selected_starttime.setFullYear(selected_date.getFullYear())
			selected_starttime.setMonth(selected_date.getMonth())
			selected_starttime.setDate(selected_date.getDate())
			selected_endtime.setFullYear(selected_date.getFullYear())
			selected_endtime.setMonth(selected_date.getMonth())
			selected_endtime.setDate(selected_date.getDate())
			if(selected_endtime.getTime() > selected_starttime.getTime()){
				clocked_time= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
				setClockedTime(clocked_time)
			}else{
				toast.error('End time must be greater then start time')
				return false;
			}
			
			let payLoad = {
				"description": taskDetail.description,
				"title": taskDetail.title,
				"videoLink": taskDetail.videoLink,
				"projectId": project.id,
				"startedAt": selected_starttime,
				"approvedStatusId": 3,
				"completedAt": selected_endtime,
				"clockedTime": clocked_time,
				"isBillable": isBillable,
				"isManual": isManual
			}
			addTask(payLoad);
			setClockedTime(0)
			setIsBillable(false)
			setTaskDetail('')
			setProject()
			setProjectId(0)
		}else{

			if (isTracking) {
			
				let currentTime = new Date();
				setIsTracking(false)
				setCheckOut(currentTime)
				setTimeout(async () => {
					clearInterval(intervalId)
					let payLoad = {
						"description": taskDetail.description,
						"title": taskDetail.title,
						"videoLink": taskDetail.videoLink,
						"projectId": project.id,
						"approvedStatusId": 3,
						"completedAt": currentTime,
						"clockedTime": clockedTime,
						"isBillable": isBillable,
						"isManual": isManual
					}
					updateTask(taskDetail.id,payLoad)
					setClockedTime(0)
					setIsBillable(false)
					setTaskDetail('')
					setProject()
					setProjectId(0)
				}, 500);
				return;
			}
			
			let currentTime = new Date();
			setIsTracking(true)
			setCheckIn(currentTime)
			startTimer()
			let payLoad = {
				"description": taskDetail.description,
				"title": taskDetail.title,
				"videoLink": taskDetail.videoLink,
				"projectId": project.id,
				"startedAt": currentTime,
				"approvedStatusId": 2,
				"completedAt": currentTime,
				"clockedTime": clockedTime,
				"isBillable": isBillable,
				"isManual": isManual
			}
			addTask(payLoad);
		}
	}


	const handleProjectChange = (evt) => {
		setProjectId(evt.target.value);
		let currentProject = projects[0].data.find(p => p.id == evt.target.value)
		setProject(currentProject)
		let project_error = '';
		
		project_error= evt.target.value === 0 ? 'Select Project' : ''

		setProjectError(project_error)
	}

	const handleDateChange = (date, value) => {
		setSelectedDate(date);
	  };

	const handleStartTimeChange = (date, value) => {
		
		let selected_date= new Date(selectedDate)
		let selected_starttime= new Date(date)
		let selected_endtime= new Date(endTime)
		selected_starttime.setFullYear(selected_date.getFullYear())
		selected_starttime.setMonth(selected_date.getMonth())
		selected_starttime.setDate(selected_date.getDate())
		selected_endtime.setFullYear(selected_date.getFullYear())
		selected_endtime.setMonth(selected_date.getMonth())
		selected_endtime.setDate(selected_date.getDate())
		if(selected_endtime.getTime() > selected_starttime.getTime()){
			setStartTimeDate(date);
			let clockedTime= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
			setClockedTime(clockedTime)
		}else{
			toast.error('End time must be greater then start time')
		}
	};

	const handleEndTimeChange = (date, value) => {
		
		
		let selected_date= new Date(selectedDate)
		let selected_starttime= new Date(startTime)
		let selected_endtime= new Date(date)
		selected_starttime.setFullYear(selected_date.getFullYear())
		selected_starttime.setMonth(selected_date.getMonth())
		selected_starttime.setDate(selected_date.getDate())
		selected_endtime.setFullYear(selected_date.getFullYear())
		selected_endtime.setMonth(selected_date.getMonth())
		selected_endtime.setDate(selected_date.getDate())
		if(selected_endtime.getTime() > selected_starttime.getTime()){
			setEndTimeDate(date);
			let clockedTime= Math.floor((selected_endtime.getTime() - selected_starttime.getTime()) / 1000)
			setClockedTime(clockedTime)
		}else{
			toast.error('End time must be greater then start time')
		}
		
	};
	

	return (
		<div className="timesheet">
			<div>
				<div className="">
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<BorderedCell align="left">
										<Checkbox
											icon={<DollarIcon />}
											checkedIcon={<DollarIcon />}
											onChange={(e) => setIsBillable(e.target.checked)}
											name="isBillable"
											checked={isBillable}
										/>
									</BorderedCell>
									<BorderedCell align="center" style={{ cursor: 'pointer' }}>

										<FormControl>
											<div style={{ display: 'flex' }} onClick={() => setOpen(!open)}>
												<ControlPointOutlinedIcon />
												<span htmlFor="age-native-simple">{project ? project.name : 'Select Project'}</span>
											</div>

											<Select
												labelId="demo-mutiple-name-label"
												id="demo-mutiple-name"
												value={projectId}
												onChange={handleProjectChange}
												input={<Input />}
												open={open}
												onClose={() => setOpen(false)}
												MenuProps={MenuProps}
											>

												{projects[0] && projects[0].data.map((project) => (
													<MenuItem key={project.name} name={project.name} value={project.id}>
														{project.name}
													</MenuItem>
												))}
											</Select>
											{projectError != '' && (
											<span className="error">
												{projectError}
											</span>)}
										</FormControl>
									</BorderedCell>

									<BorderedCell align="center">
										<div
											style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }}
											onClick={() => {
												if (!project) {
													alert('Please select project for task')
													return;
												}
												setModelOpen(true);
											}}>
											{taskDetail ? (taskDetail.title) : ("What are you working")}<DescriptionIcon />
										</div>
									</BorderedCell>
									{isManual && (
										<BorderedCell  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
											<KeyboardDatePicker  style={{ width: '25%' }}
											disableToolbar
											format="MM/DD/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date"
											value={selectedDate}
											onChange={handleDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											/>
											<KeyboardTimePicker style={{ width: '25%' }}
											margin="normal"
											id="start-time-picker"
											label="Start"
											value={startTime}
											onChange={handleStartTimeChange}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
											/>

											<KeyboardTimePicker style={{ width: '25%' }}
											margin="normal"
											id="end-time-picker"
											label="End"
											value={endTime}
											onChange={handleEndTimeChange}
											KeyboardButtonProps={{
												'aria-label': 'change time',
											}}
											/>
										</BorderedCell>
									)}
									
									<BorderedCell align="center" style={{ minWidth: '110px'}}>{formatTime(clockedTime)}</BorderedCell>
									<BorderedCell align="center">
										{!isManual && (
											<Button variant="contained"

												startIcon={<StartIcon />}
												// color="#000000"
												onClick={() => handleSubmit()}
											>
												{isTracking ? 'Stop' : 'Start'}
											</Button>
										)}

										{isManual && (
											<Button variant="contained"

												startIcon={<StartIcon />}
												onClick={() => handleSubmit()}
											>
												Add
											</Button>
										)}
										
									</BorderedCell>

									<BorderedCell align="center" style={{ display: 'flex', flexDirection: 'column' }}>
										<Checkbox
											icon={<ClockIcon />}
											checkedIcon={<ClockIcon />}
											onChange={(e) => { if(!isTracking){
												setIsManual(false);
												setClockedTime(0)}}}
											checked={!isManual}
										/>
										<Checkbox
											icon={<ListIcon />}
											checkedIcon={<ListIcon />}
											onChange={(e) => { if(!isTracking){setIsManual(true) }}}
											checked={isManual}
										/>
										{/* <ClockIcon onClick={() => setIsManual(false)} />
										<br />
										<ListIcon  onClick={() => setIsManual(true)} /> */}
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

			<div>
				<TaskEntryModel open={modelOpen} task={task} handleTaskSave={(task) => setTaskDetail(task)} handleClose={() => setModelOpen(false)} />
			</div>


		</div>

	)
}

export default getConnect(Index)
