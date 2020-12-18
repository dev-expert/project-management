import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getConnect from './connect';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateProject({ addProject, project }) {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  
  const [submit, setSubmit ] = useState(false);
  useEffect(() => {
    if(project && Object.keys(project).length) {
      history.push('/projects')
    }
  }, [project, history])
  
  const handleSubmit = () => {
    setSubmit(true)
    if(name) {
      addProject({ name, startDate, endDate, description })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Poject Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                onChange={e => setName(e.target.value)}
                value={name}
                autoFocus
                error={submit && !name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item xs={12} sm={12}>
        <KeyboardDatePicker
          inputVariant='outlined'
          fullWidth
          margin="normal"
          id="startDate"
          label="Start Date"
          format="DD/MM/yyyy"
          value={startDate}
          onChange={setStartDate}
          required
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <KeyboardDatePicker
          inputVariant='outlined'
          fullWidth
          margin="normal"
          id="endDate"
          label="End Date"
          format="DD/MM/yyyy"
          value={endDate}
          required
          onChange={setEndDate}
        />
      </Grid>

    </MuiPickersUtilsProvider>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create Project
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default  getConnect(CreateProject);