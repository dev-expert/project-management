import React, { useState, useEffect } from 'react'
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Button from '@material-ui/core/Button';



const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};


const ReportsOverview = (props) => {
	const [projects, setProjects] = useState([]);
	const [selectedProjects, setSelectedProjects] = useState([]);
	const [teams, setTeams] = useState([]);
	const [selectedTeams, setSelectedTeams] = useState([]);

	const [clients, setClients] = useState([]);
	const [selectedClients, setSelectedClients] = useState([]);

	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);

	useEffect(() => {

		if (props.projects && props.projects[0]) {
			const projects = props.projects[0].data;
			setProjects(projects);
		}
	}, [props.projects]);

	useEffect(() => {
		if (props.users && props.users[0]) {
			const tmpUsers = props.users[0].data;
			setUsers(tmpUsers);
		}
	}, [props.users])

	const handleApplyFilter = () => {
		props.applyFilter({projects:selectedProjects,users:selectedUsers})
	}

	return (
		<div className="reports__filter">
			<div className="dropdowns">
				<FormControl>
					<InputLabel id="demo-controlled-open-select-label">Team</InputLabel>
					<Select
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						multiple
						value={selectedTeams}
						onChange={(event) => {
							setSelectedTeams(event.target.value);
						}}
						input={<Input />}
						renderValue={(selected) => (
							<div className="chips">
								{selected.map((value) => (
									<Chip key={value} label={value} className="chip" />
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{teams.map((team) => (
							<MenuItem key={team.id} value={team.name}>
								<Checkbox checked={selectedTeams.indexOf(team.name) > -1} />
								<ListItemText primary={team.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<InputLabel id="demo-controlled-open-select-label">Project</InputLabel>
					<Select
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						multiple
						value={selectedProjects}
						onChange={(event) => {
							setSelectedProjects(event.target.value);
						}}
						input={<Input />}
						renderValue={(selected) => (
							<div className="chips">
								{selected.map((value) => {
									return (
									<Chip key={value} label={value} className="chip" />
								)})}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{projects.map((project) => (
							<MenuItem key={project.id} value={project.id}>
								<Checkbox checked={selectedProjects.indexOf(project.id) > -1} />
								<ListItemText primary={project.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>


				{/* Clients */}
				 <FormControl>
					<InputLabel id="demo-controlled-open-select-label">Clients</InputLabel>
					<Select
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						multiple
						value={selectedClients}
						onChange={(event) => {
							setSelectedClients(event.target.value);
						}}
						input={<Input />}
						renderValue={(selected) => (
							<div className="chips">
								{selected.map((value) => (
									<Chip key={value} label={value} className="chip" />
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{clients.map((client) => (
							<MenuItem key={client.id} value={client.name}>
								<Checkbox checked={selectedClients.indexOf(client.name) > -1} />
								<ListItemText primary={client.name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* Users  */}
				<FormControl>
					<InputLabel id="demo-controlled-open-select-label">Users</InputLabel>
					<Select
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						multiple
						value={selectedUsers}
						onChange={(event) => {
							setSelectedUsers(event.target.value);
						}}
						input={<Input />}
						renderValue={(selected) => (
							<div className="chips">
								{selected.map((value) => (
									<Chip key={value} label={value} className="chip" />
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{users.map((user) => (
							<MenuItem key={user.id} value={user.id}>
								<Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
								<ListItemText primary={user.firstName + " " + user.lastName} />
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* Apply filter */}
				<Button variant="contained" onClick={handleApplyFilter} style={{backgroundColor:'#0F59A5',margin:'10px 10px', color:'white'}}  >Apply Filter</Button>

			</div>

			{/* date filter */}
			<div className="date">
				{/* <form noValidate>
					<TextField
						id="datetime-local"
						type="datetime-local"
						onBlur={(e) => {
							// if (moment(task.completedAt).isSame(e.target.value)) {
							// 	return;
							// }
							// updateTask(task.id, { completedAt: e.target.value })
						}}
						defaultValue={moment(new Date()).format("YYYY-MM-DDTHH:mm")}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</form> */}
			</div>

		</div>
	)
}

export default ReportsOverview
