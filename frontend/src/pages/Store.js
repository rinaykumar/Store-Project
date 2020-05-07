import React from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Typography,
  Alert,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Grid,
  Paper,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import "../App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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

  bodyContent: {
    marginTop: theme.spacing(10),
    marginLeft: "2rem",

  },
}));

const Store = ({ appUser, setAppUser }) => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState("");
  const [items, setItems] = React.useState([]);
  let itemsMap = new Map();

  const fetchItems = () => {
    axios
      .get("/api/getAllItems")
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
      })
      .catch(console.log);
  };

  const parseItem = (item) => {
    let obj = JSON.parse(item);
    itemsMap.set(obj.item, obj.price);
    console.log(itemsMap);
    return obj.item;
  };

  const parsePrice = (selectedItem) => {
    console.log("From parsePrice");
    return itemsMap.get(selectedItem);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  /* Only logged in users can access
  if (!appUser) {
    return <Redirect to="/"/>;
  }
  */

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
            Store
          </Typography>
          <div>
            <nav>
              <Typography component="h7" variant="h7">
              {appUser === "admin" && <Link to="/management" className={classes.right}>Management</Link>}
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
      <div>
        <select
          class="dropdown"
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option disabled selected value>
            Select An Item
          </option>
          {items.map((item) => {
            return <option>{parseItem(item)}</option>;
          })}
        </select>
        <input value={parsePrice(selectedItem)} placeholder="Price"></input>
        <input value="" placeholder="Quantity"></input>
      </div>
      </Container>

      {/* <nav>
        {appUser && <p>Welcome {appUser}</p>}
        {appUser === "admin" && <Link to="/management">Management</Link>}
        <Link to="/logout">Logout</Link>
      </nav> */}

    </div>
  );
};

export default Store;
