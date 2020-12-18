import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from './Common';
import getConnect from './connect';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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
function Projects({ projects, getProjects }) {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    getProjects();
  }, [getProjects])
  const createProject = () => {
    history.push('/projects/create');
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
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Clients</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects && projects.length ? projects.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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