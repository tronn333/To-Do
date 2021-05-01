import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
    height: '50px',

  }
}));


export default function Signup() {
  const classes = useStyles();
  const history = useHistory()

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const formHandler = async (e)=>{
    e.preventDefault()
    const response = await fetch('http://localhost:3001/signup',
    {method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email,name,password})
  })
  const serverResponse = await response.json()
  if (response.status === 200) {
     localStorage.setItem('token', `${serverResponse.accessToken}`)
     history.push('/game')  } 
  }
     const emailHandler =  (e)=>{
      setemail(() => e.target.value)
     }
     const nameHandler =  (e)=>{
      setname(() => e.target.value)
     } 
     const passwordHandler =  (e)=>{
      setpassword(() => e.target.value)
     } 

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
      </Typography>
        <form className={classes.form} onSubmit={formHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={nameHandler}
                value={name}
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                onChange={emailHandler}
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                onChange={passwordHandler}
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
