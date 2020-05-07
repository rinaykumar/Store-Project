import React from "react";
import { Redirect, Link } from "react-router-dom";

import {Typography, Alert, AppBar, Tabs, Tab, Toolbar, Grid, Paper, TextField, Button} from "@material-ui/core";

import { makeStyles, withTheme } from "@material-ui/core/styles";

import "../App.css";
import axios from "axios";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
    textDecoration: 'none',
    paddingLeft: "1em",
    '&:hover': {
      opacity: "1",
    }
  },
  
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Management = ({ appUser, setAppUser }) => {
  const classes = useStyles();
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [items, setItems] = React.useState([]);

  const fetchItems = () => {
    axios
      .get("/api/getAllItems")
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
      price: price,
    };
    axios
      .post("/api/addItem", body)
      .then(() => setItem(""))
      .then(() => setPrice(""))
      .then(() => fetchItems())
      .catch(console.log);
  };

  const deleteItem = (itemName) => {
    console.log("From deleteItem");
    console.log(itemName);
    const body = {
      item: parseItem(itemName),
      price: parsePrice(itemName),
    };
    axios
      .post("/api/deleteItem", body)
      .then(() => setItem(""))
      .then(() => setPrice(""))
      .then(() => fetchItems())
      .catch(console.log);
  };

  const parseItem = (item) => {
    let obj = JSON.parse(item);
    return obj.item;
  };

  const parsePrice = (item) => {
    let obj = JSON.parse(item);
    return obj.price;
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  // if (appUser !== "admin") {
  //   return <Redirect to="/" />;
  // }



  return (
    <div>

       <AppBar position="absolute"  className={classes.appBar} >
        <Toolbar className={classes.toolbar}>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Management Dashboard
          </Typography>
          <div>
        <nav>
          {appUser && <p>Welcome {appUser}</p>}
          <Typography component="h7" variant="h7" >
          <Link to="/store" className={classes.right}>Visit Store</Link>
          <Link to="/logout" className={classes.right}>Logout</Link>
          </Typography>

        </nav>
        
      </div>
        </Toolbar>
      </AppBar>

      <div>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item Name"
        />
        <button onClick={submitItem}>Add</button>
      </div>
      <div>
        <p>Inventory:</p>
        <div className="items-list">
          {items.map((item) => {
            return (
              <div className="items-item">
                {parsePrice(item)}
                {parseItem(item)}
                <button onClick={() => deleteItem(item)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Management;
