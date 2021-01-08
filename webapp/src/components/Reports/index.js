import React, { useEffect, useState } from 'react'
import ReportsTable from './Table';
import getConnect from '../Common/connect';
import TaskEntryModel from '../Timesheet/TaskEntryModal';
import ReportsMenu from './ReportsMenu'
import ReportsFilter from './ReportsFilter'
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


const Index = ({ getTaskReports, getProjects, reportTasks, projects, addTask, updateTask, getTask, getInProgressTask,getUsers,users }) => {
	const [modelOpen, setModelOpen] = useState(false);
	const [currentTask,setCurrentTask] = useState();

	useEffect(() => {
		getProjects();
		getTaskReports();
		getUsers();

	}, [getTaskReports])
	console.log("Users: ",users);

	useEffect(() => {
		// Fetch INPROGRESS Task,
	}, []);

	const handleViewTask = (reportTask) => {
		setCurrentTask(reportTask)
		setModelOpen(true)
	}

	const handleApproveTask = (taskId,) => {
		updateTask(taskId,{approvedStatusId:1})
	}


	return (
		<div className="reports">
			<ReportsMenu/>
			<div className="main">
					<ReportsFilter projects={projects} users={users}/>
					<ReportsTable reportTasks={reportTasks} onViewTask={handleViewTask} onApproveTask={handleApproveTask}/>
			</div>
			<div>
			{modelOpen &&	<TaskEntryModel open={modelOpen} task={currentTask} handleTaskSave={(task) => console.log('View only')} handleClose={() => setModelOpen(false)} />}
			</div>
		</div>

	)
}

export default getConnect(Index)
