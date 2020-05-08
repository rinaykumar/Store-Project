import React from "react";
import { Redirect, Link } from "react-router-dom";

import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Paper,
  TextField,
  Button,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import "../App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },

  right: {
    color: "white",
    opacity: "0.6",
    textDecoration: "none",
    paddingLeft: "1em",
    "&:hover": {
      opacity: "1",
    },
  },

  itemList: {
    paddingTop: theme.spacing(2),
    width: "75ch",
    margin: theme.spacing(1),
  },

  paperList: {
    height: "5ch",
    width: "75ch",
    display: "flex",
  },

  bodyContent: {
    marginTop: theme.spacing(10),
    marginLeft: "2rem",

  },

  price: {
    paddingLeft: theme.spacing(2),
    paddingTop: "1rem",
  },

  itemName: {
    paddingLeft: theme.spacing(4),
    paddingTop: "1rem",
  },

  deleteButton: {
    paddingLeft: theme.spacing(4),
    paddingTop: "0.45rem",
    paddingRight: "0.3rem",
  },

  itemContainer: {},

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Management = ({appUser, setAppUser}) => {
  const classes = useStyles();
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState(''); 
  const [items, setItems] = React.useState([]);
   
  const fetchItems = () => {
    axios.get('/api/getAllItems')
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
      })
      .catch(console.log);
  };

  const submitItem = () => { 
    console.log("From submitItem");
    console.log(item);
    console.log(price);
    const body = {
      item: item,
      price: price
    };
    axios.post('/api/addItem', body)
      .then(() => setItem(''))
      .then(() => setPrice(''))
      .then(() => fetchItems())
      .catch(console.log);
  };

  const deleteItem = (itemName) => { 
    console.log("From deleteItem");
    console.log(itemName);
    const body = {
      item: parseItem(itemName),
      price: parsePrice(itemName)
    };
    axios.post('/api/deleteItem', body)
      .then(() => setItem(''))
      .then(() => setPrice(''))
      .then(() => fetchItems())
      .catch(console.log);
  };

  const parseItem = (item) => {
    let obj = JSON.parse(item);
    return obj.item;
  }

  const parsePrice = (item) => {
    let obj = JSON.parse(item);
    return obj.price;
  }

  React.useEffect(() => {
    fetchItems();
  }, []);

  // Only admin can access management page
  if (appUser !== 'admin') {
    return <Redirect to="/"/>;
  }

  return (
    <div>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Management Dashboard
          </Typography>
          <div>
            <nav>
              <Typography component="h7" variant="h7">
                <Link to="/store" className={classes.right}>
                  Visit Store
                </Link>
                <Link to="/logout" className={classes.right}>
                  Logout
                </Link>
              </Typography>
            </nav>
          </div>
        </Toolbar>
      </AppBar>

      <Container className={classes.bodyContent}>
        {appUser && <p>Welcome {appUser}</p>}
        
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="outlined-basic"
            label="Enter Price ($)"
            variant="outlined"
          />
          <TextField
            value={item}
            onChange={(e) => setItem(e.target.value)}
            id="outlined-basic"
            label="Enter Item Name"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={submitItem}>
            Add
          </Button>
        </form>
        
        <div className={classes.itemContainer}>
        <p>Inventory:</p>
        
          {items.map((item) => {
            return (
              <Paper elevation={3} className={classes.paperList}>
                <Grid
                  justify="space-between" // Add it here :)
                  container
                  spacing={24}
                >
                  <Grid item xs={4} justify="center">
                    <div className={classes.price}>${parsePrice(item)}</div>
                  </Grid>

                  <Grid item xs={4} justify="center">
                    <div className={classes.itemName}>{parseItem(item)}</div>
                  </Grid>

                  <Grid item xs={2} justify="center"> 
                    <div className={classes.deleteButton}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteItem(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>

            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Management;