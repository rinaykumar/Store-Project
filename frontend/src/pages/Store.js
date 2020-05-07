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
  MenuItem,
  Paper,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Select,
  Container,
} from "@material-ui/core";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import "../App.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
      minWidth: 120,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  text: {
    marginTop: "1.8rem",
    maxWidth  : "30px",
  }
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
                {appUser === "admin" && (
                  <Link to="/management" className={classes.right}>
                    Management
                  </Link>
                )}
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
          <FormControl
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              {items.map((item) => {
                return <MenuItem  value={parseItem(item)}>{parseItem(item)}</MenuItem>;
              })}
            </Select>
          </FormControl>
         

          <Typography className={classes.text}>
            Price: ${parsePrice(selectedItem)}
          </Typography>
        
          <TextField
          
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
          />

          <Button variant="contained" color="primary">
            Add To Cart
          </Button>
        </form>


      </Container>
    </div>
  );
};

export default Store;
