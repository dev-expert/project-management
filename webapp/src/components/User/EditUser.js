import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getConnect from '../Common/connect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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



function DisplayUser({ history, addUser, userActionPerformed, getUser, user,updateUser ,getRoles,roles,editUser}) {
    const id = history.location.state.id;
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('-1');
    const [submit, setSubmit] = useState(false);
    useEffect(() => {

        getUser(id);

    }, [getUser, id])
    useEffect(() => {
        getRoles();
      }, [getRoles])

    useEffect(() => {
        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setType(user.role?user.role.id:'-1');
            setSubmit(false);
        }

    }, [user])

    useEffect(() => {
        if (editUser) {

            history.push('/users')
        }
    }, [editUser, history])
    const handleSubmit = () => {
        setSubmit(true)
        if (email && firstName && type) {
            updateUser(id,{ email, firstName, lastName, role: type });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit User
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                autoFocus
                                error={submit && !firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                error={submit && !email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="type-user">Type</InputLabel>
                                <Select
                                    required
                                    labelId="type-user"
                                    id="typeUserId"
                                    value={type}
                                    fullWidth
                                    onChange={e => setType(e.target.value)}
                                    label="Type"
                                    error={submit && !type}
                                >
                                   <MenuItem value="-1">
                <em>None</em>
              </MenuItem>
              {roles && roles.length ? roles.map((row, id) => (
                <MenuItem key={row.id} value={row.id}>{row.role}</MenuItem>
              )) : null}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                         Save
          </Button>
                </form>
            </div>
        </Container>
    );
}
export default getConnect(DisplayUser);