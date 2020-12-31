import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"

import { Title } from '../Common';
import getConnect from '../Common/connect';
import { IconButton  } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../../config/helper';

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
function Users({ history, getUsers, users,deleteUser }) {
  const classes = useStyles();
  useEffect(() => {
    getUsers();
  }, [getUsers])
  const createUser = () => {
    history.push('/users/create');
  }
  const editUser  = (id) => {
           history.push({
           pathname: '/users/edit',
           state: { id: id }
       });

  }
  const handelDelete  = (id) => {
    deleteUser(id);
}
  
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3} justify='flex-end'>
        <Grid item xs={9} md={10} lg={10}>
          <Title>Users</Title>
        </Grid>
        <Grid item xs={3} md={2} lg={2}>
          <button onClick={createUser} className='btn btn-primary'>
          Create User
          </button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.length ? users.map((row, id) => (
              <TableRow key={row.id}>
                <TableCell>{id+1}</TableCell>
                <TableCell>{row.firstName} {row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell align="left"><IconButton aria-label="edit" onClick={e => editUser(row.id)}><CreateIcon /></IconButton>
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
export default getConnect(Users);