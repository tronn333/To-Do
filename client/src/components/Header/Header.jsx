import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const dispatch = useDispatch()
  const classes = useStyles();
  useEffect(() => {

    (async () => {
      if (localStorage.getItem('token')) {
        const response = await fetch('http://localhost:3001/user', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        })
        if (response.status === 200) {
          const serverResponse = await response.json()
          dispatch({ type: 'LOGIN_USER', payload: serverResponse })
        }
      }
    })()
  }, [])
  const buttonLogoutHandler = () => {
    localStorage.removeItem('token')
  }
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Header
          </Typography>
          {
            user?.name ? <><Button color="inherit">{user.name}</Button><Link to="/game" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color="inherit">Играть</Button></Link><Button onClick={buttonLogoutHandler} color="inherit">Выйти</Button></> :
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Войти</Button></Link>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Регистрация</Button></Link>
              </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
