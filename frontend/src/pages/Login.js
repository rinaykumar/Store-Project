import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import brand2 from "./img/brand2.png";  
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: `url(${brand2})`,
      backgroundRepeat: "no-repeat",
      backgroundColor: "#3F51B5",
      backgroundSize: "contain",
      backgroundPosition: "center"
    },
    container: {
      display: "flex",
      alignItems: "center"
    },
    paper: {
      margin: theme.spacing(8, 4),
      flex: 1
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    icon: {
      marginBottom: theme.spacing(8)
    }
  }));

  const Login = ({appUser, setAppUser}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const classes = useStyles();
  
    const handleAuth = () => {
      const body = {
        username: username,
        password: password
      };

      axios.post('/api/authenticate', body)
        .then((res) => {
          console.log(res.data); // DTO from Spark
          if(res.data.success){
            console.log('Worked');
            setAppUser(username);
          }else{
            setError(res.data.error);
          }
        })
        .catch(() => {
          setError("Failed to login");
        });
    };
  
    if (appUser === 'admin') {
        return <Redirect to="/management"/>;
    } else if (appUser === 'user') {
        return <Redirect to="/store"/>;
    }

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} md={4} className={classes.image} />
        <Grid
          item
          xs={12}
          md={8}
          component={Paper}
          elevation={6}
          className={classes.container}
          square
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.icon}>
              Login
            </Typography>
            
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
                <div>
                {error && <strong><Alert severity="error">{error}</Alert></strong>}
                </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                label="Login"
                disabled={!username || !password} 
                onClick={handleAuth}
              >
                Login
             </Button>
          </div>
        </Grid>
      </Grid>
    );
};

export default Login;