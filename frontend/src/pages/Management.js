import React from "react";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "../App.css";
import axios from "axios";

const Management = ({ appUser, setAppUser }) => {
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

  if (appUser !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <AppBar title="My App">
        <Tabs>
          <Tab label="Item 1" />
          <Tab label="Item 2" />
          <Tab label="Item 3" />
          <Tab label="Item 4" />
        </Tabs>
      </AppBar>
      <div>
        <nav>
          {appUser && <p>Welcome {appUser}</p>}
          <Link to="/store">Store</Link>
          <Link to="/logout">Logout</Link>
        </nav>
        <h1>Management Page</h1>
      </div>
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
