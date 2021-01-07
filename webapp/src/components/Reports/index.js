import React, { useEffect, useState } from 'react'
import ReportsTable from './Table';
import getConnect from '../Common/connect';
import TaskEntryModel from '../Timesheet/TaskEntryModal';

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


const Index = ({ getTasks, getProjects, tasks, projects, addTask, updateTask, getTask, getInProgressTask }) => {
	const [modelOpen, setModelOpen] = useState(false);
	const [currentTask,setCurrentTask] = useState();

	useEffect(() => {
		getProjects();
		getTasks();

	}, [getTasks])

	useEffect(() => {
		// Fetch INPROGRESS Task,
	}, []);

	const handleViewTask = (task) => {
		setCurrentTask(task)
		setModelOpen(true)
	}

	const handleApproveTask = (taskId,) => {
		updateTask(taskId,{approvedStatusId:1})
	}


	return (
		<div className="reports">
			<div>
				<div className="reports__table">
					<ReportsTable tasks={tasks} onViewTask={handleViewTask} onApproveTask={handleApproveTask}/>
				</div>
			</div>
			<div>
			{modelOpen &&	<TaskEntryModel open={modelOpen} task={currentTask} handleTaskSave={(task) => console.log('View only')} handleClose={() => setModelOpen(false)} />}
			</div>
		</div>

	)
}

export default getConnect(Index)
