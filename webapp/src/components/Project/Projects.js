import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from '../Common';
import getConnect from '../Common/connect';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../../config/helper';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import { IconButton  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
function Projects({ projects, getProjects, history ,deleteProject}) {
  const classes = useStyles();
  useEffect(() => {
    getProjects();
  }, [getProjects])
  const createProject = () => {
    history.push('/projects/create');
  }
  const editProject  = (id) => {
    history.push({
    pathname: '/project/edit',
    state: { id: id }
});

}
const handelDelete  = (id) => {
  deleteProject(id)
}
  return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        <Grid item xs={9} md={10} lg={10}>
          <Title>Projects</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2} justify='flex-end'>
          <button onClick={createProject} className='btn btn-primary'>
          Create Project
          </button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              {/* <TableCell>Clients</TableCell>
              <TableCell>Users</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { projects && projects.length ? projects[0].projects.map((row, id) => (
              <TableRow key={row.id}>
                <TableCell>{id+1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDate(row.startDate)}</TableCell>
                <TableCell>{formatDate(row.endDate)}</TableCell>
                {/* <TableCell></TableCell>
                <TableCell></TableCell> */}
                <TableCell align="left"><IconButton aria-label="edit" onClick={e => editProject(row.id)}><CreateIcon /></IconButton>
                <IconButton aria-label="edit" onClick={e => handelDelete(row.id)}><DeleteIcon /></IconButton></TableCell>  
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
        </Grid>
      </Grid>
    </Container>
  );
}
export default getConnect(Projects);