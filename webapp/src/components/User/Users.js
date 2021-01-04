import React, { useEffect, useState } from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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
  paginate: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Users({ history, getUsers, users, deleteUser, getRoles, roles }) {
  
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    getUsers(offset, limit, search);
    getRoles();
  }, [getUsers, getRoles])
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

  const handleChange = (event, value) => {
    console.log(event)
    console.log(value)
    setPage(value);
    setOffset(value-1);
    getUsers(value-1, limit, search);
  };

  const handleRoleChange = (event) => {
    setSearch({
      name: search.name,
      email: search.email,
      role: event.target.value
    })
  };

  const handleNameChange = (event) => {
    setSearch({
      name: event.target.value,
      email: event.target.value,
      role: search.role
    })
  };
  
  const handleSearch = () => {
    setOffset(0)
    setPage(1)
    getUsers(0, limit, search);
  };

  
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
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="name" label="Search" onChange={handleNameChange} variant="outlined" />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={search.role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles && roles.length ? roles.map((row, id) => (
                <MenuItem key={row.id} value={row.id}>{row.role}</MenuItem>
              )) : null}
             
            </Select>
          </FormControl>
          <button onClick={handleSearch} type="button" className='btn btn-primary'>
          Search
          </button>
        </form>
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
                <TableCell>{row.role.role}</TableCell>
                <TableCell align="left"><IconButton aria-label="edit" onClick={e => editUser(row.id)}><CreateIcon /></IconButton>
                <IconButton aria-label="edit" onClick={e => handelDelete(row.id)}><DeleteIcon /></IconButton></TableCell>  
              </TableRow>
            )) : null}
        </TableBody>
      </Table>
      <div className={classes.paginate}>
        <Pagination count={15} page={page} onChange={handleChange} siblingCount={1} boundaryCount={1}  variant="outlined" />
      </div>
      </Grid>
      </Grid>
    </Container>
  );
}
export default getConnect(Users);