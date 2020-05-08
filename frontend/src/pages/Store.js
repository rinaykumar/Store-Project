import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
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
  paperList: {
    height: "5ch",
    width: "75ch",
    display: "flex",

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
    maxWidth: "30px",
  },

  itemName: {
    paddingLeft: theme.spacing(4),
    paddingTop: "1rem",
  },

  price: {
    // paddingLeft: theme.spacing(2),
    paddingTop: "1rem",
  },

  deleteButton: {
    paddingLeft: theme.spacing(4),
    paddingTop: "0.45rem",
    paddingRight: "0.3rem",
  },

  totalLabel: {
    paddingTop: "1rem",
  },
}));

const Store = ({ appUser, setAppUser }) => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [quantity, setQuantity] = React.useState("");
  const [cart, setCart] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  let itemsMap = new Map();
  let total = [];

  const fetchItems = () => {
    axios
      .get("/api/getAllItems")
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
      })
      .catch(console.log);
  };

  const fetchCart = () => {
    axios
      .get("/api/getCart")
      .then((res) => {
        console.log(res);
        setCart(res.data.cart);
        //console.log(cart)
      })
      .catch(console.log);
  };

  const fetchTransactions = () => {
    axios
      .get("/api/getTransactions")
      .then((res) => {
        console.log(res);
        setTransactions(res.data.transactions);
      })
      .catch(console.log);
  };

  const addCart = (name, quant) => {
    console.log("From addCart");
    console.log(name);
    console.log(quant);
    const body = {
      item: name,
      price: itemsMap.get(name),
      quantity: quant,
    };
    axios
      .post("/api/addCart", body)
      .then(() => setSelectedItem(""))
      .then(() => setQuantity(""))
      .then(() => fetchCart())
      .catch(console.log);
  };

  const deleteCart = (cartName) => {
    console.log("From deleteCart");
    const body = {
      item: parseCartItem(cartName),
      price: itemsMap.get(parseCartItem(cartName)),
      quantity: parseCartQuantity(cartName),
    };
    axios
      .post("/api/deleteCart", body)
      //.then(() => setItem(''))
      //.then(() => setPrice(''))
      .then(() => fetchCart())
      .catch(console.log);
  };

  const addTransaction = (cartItems, cartTotal) => {
    console.log("From addTransaction");
    console.log(cartItems);
    console.log(sumTotal(cartTotal));
    const body = {
      items: cartItems,
      total: sumTotal(cartTotal),
    };
    axios
      .post("/api/addTransaction", body)
      //.then(() => setSelectedItem(''))
      //.then(() => setQuantity(''))
      .then(() => fetchTransactions())
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

  const parseCartItem = (cartItem) => {
    let obj = JSON.parse(cartItem);
    return obj.item;
  };

  const parseCartQuantity = (cartItem) => {
    let obj = JSON.parse(cartItem);
    return obj.quantity;
  };

  const parseCartSubtotal = (cartItem) => {
    let obj = JSON.parse(cartItem);
    total.push(obj.subtotal);
    return obj.subtotal;
  };

  const sumTotal = (total) => {
    let cartTotal = total.reduce(function (a, b) {
      return a + b;
    }, 0);
    return cartTotal;
  };

  React.useEffect(() => {
    fetchItems();
    fetchCart();
    fetchTransactions();
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

        <p>Cart</p>
        <div>
          {cart.map((cartItem) => {
            return (
              <Paper elevation={3} className={classes.paperList}>
                <Grid
                  justify="space-between" // Add it here :)
                  container
                  spacing={24}
                >
                  <Grid item>
                    <div className={classes.itemName}>
                      {" "}
                      {parseCartItem(cartItem)}
                    </div>
                  </Grid>

                  <Grid item>
                    <div className={classes.itemName}>
                      x{parseCartQuantity(cartItem)}
                    </div>
                  </Grid>

                  <Grid item>
                    <div className={classes.price}>
                      <b>${parseCartSubtotal(cartItem)}</b>
                    </div>
                  </Grid>

                  <Grid item>
                    <div className={classes.deleteButton}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteCart(cartItem)}
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

        <div className={classes.totalLabel}>
          Total: <b>${sumTotal(total)}</b>
        </div>

        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              {items.map((item) => {
                return (
                  <MenuItem value={parseItem(item)}>{parseItem(item)}</MenuItem>
                );
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
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => addCart(selectedItem, quantity)}
          >
            Add To Cart
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => addTransaction(cart, total)}
          >
            Checkout
          </Button>
        </form>

        <div>
          Transaction History:
          <div>
            {transactions.map((transactionItem) => {
              return <div class="items-item">{transactionItem}</div>;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Store;
