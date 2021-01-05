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
	const [projectId, setProjectId] = useState(1);
	const [isBillable, setIsBillable] = useState(false);
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [clockedTime, setClockedTime] = useState(0);
	const [submittedBy, setSubmittedBy] = useState(3);
	const [isTracking, setIsTracking] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const [open, setOpen] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);
	const [project, setProject] = useState();
	const [taskDetail, setTaskDetail] = useState('');
	useEffect(() => {
		getProjects();
		getTasks();


		let startTime = localStorage.getItem('startTime')
		let currentTime = new Date().getTime();
		let clockedTime = Math.floor((currentTime - Number(startTime)) / 1000)

		if (startTime) {
			let d = new Date()
			d.setTime(Number(startTime))
			setCheckIn(d)
			setClockedTime(clockedTime)
			setIsTracking(true)
			startTimer()

		}

	}, [getTasks])

	useEffect(() => {
		// Fetch INPROGRESS Task,
		getInProgressTask();
	}, []);


	let currentProject
	if (projects && projects[0] && task) {

		currentProject = projects[0].data.find(p => p.id == task.projectId)
	}


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
		if (isTracking) {
			let currentTime = new Date();
			setIsTracking(false)
			setCheckOut(currentTime)
			setTimeout(async () => {
				let payLoad = {
					"description": task.description,
					"projectId": currentProject.id,
					"startedAt": checkIn,
					"approvedStatusId": 3,
					"completedAt": currentTime,
					"clockedTime": clockedTime,
					"isBillable": isBillable,
					"createdBy": submittedBy
				}
		    	updateTask(task.id,payLoad)
				setClockedTime(0)
			}, 500);
			return;
		}
		// setIsTracking(false)
		// setCheckOut(currentTime)
		let currentTime = new Date();
		setIsTracking(false)
		setCheckOut(currentTime)
		setTimeout(async () => {
			let payLoad = {
				"description": taskDetail.description,
				"projectId": currentProject.id,
				"startedAt": checkIn,
				"approvedStatusId": 2,
				"completedAt": currentTime,
				"clockedTime": clockedTime,
				"isBillable": isBillable,
				"createdBy": submittedBy
			}
			addTask(payLoad);
			// setClockedTime(0)
		}, 500);


		// if (!isTracking) {
		// 	let currentTime = new Date();
		// 	localStorage.setItem("startTime", currentTime.getTime())
		// 	setIsTracking(true)
		// 	setCheckIn(currentTime)
		// 	startTimer()
		// } else {
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
		// clearInterval(intervalId)

		// localStorage.removeItem("startTime");

	}


	const handleProjectChange = (evt) => {
		setProject(evt.target.value);
	}


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
										/>
									</BorderedCell>
									<BorderedCell align="center" style={{ cursor: 'pointer' }}>

										<FormControl>
											<div style={{ display: 'flex' }} onClick={() => setOpen(!open)}>
												<ControlPointOutlinedIcon />
												<span htmlFor="age-native-simple">{currentProject ? currentProject.name : 'Select Project'}</span>
											</div>

											<Select
												labelId="demo-mutiple-name-label"
												id="demo-mutiple-name"
												value={project && project.name}
												onChange={handleProjectChange}
												input={<Input />}
												open={open}
												onClose={() => setOpen(false)}
												MenuProps={MenuProps}
											>

												{projects[0] && projects[0].data.map((project) => (
													<MenuItem key={project.name} name={project.name} value={project}>
														{project.name}
													</MenuItem>
												))}
											</Select>
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
									<BorderedCell align="center">{formatTime(clockedTime)}</BorderedCell>
									<BorderedCell align="center"><Button variant="contained"

										startIcon={<StartIcon />}
										// color="#000000"
										onClick={() => handleSubmit()}
									>
										{isTracking ? 'Stop' : 'Start'}
									</Button></BorderedCell>

									<BorderedCell align="center">
										<ClockIcon />
										<br />
										<ListIcon />
									</BorderedCell>

								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</div>



				<div className="timesheet__table">
					<TimeSheetTable tasks={tasks} />
				</div>
			</div>

			<div>
				<TaskEntryModel open={modelOpen} task={task} handleTaskSave={(task) => setTaskDetail(task)} handleClose={() => setModelOpen(false)} />
			</div>


		</div>

	)
}

export default getConnect(Index)
