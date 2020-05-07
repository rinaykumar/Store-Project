import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Store = ({appUser, setAppUser}) => {
  const [selectedItem, setSelectedItem] = React.useState('');
  const [item, setItem] = React.useState('');
  const [items, setItems] = React.useState([]);

  const [trans, setTrans] = React.useState([]);
  const [price, setPrice] = React.useState('');
  const [quantity, setQuan] = React.useState('');
  let itemsMap = new Map();

  const fetchItems = () => {
    axios.get('/api/getAllItems')
      .then((res) => {
        console.log(res);
        setItems(res.data.items);
      })
      .catch(console.log);
  };

  const parseItem = (item) => {
    let obj = JSON.parse(item);
    itemsMap.set(obj.item, obj.price)
    console.log(itemsMap);
    return obj.item;
  }

  const parsePrice = (selectedItem) => {
    console.log("From parsePrice");
    return itemsMap.get(selectedItem);
  }

  const fetchTrans = () => {
    // utility to get all notes
    axios.get('/api/getTrans')
      .then((res) => {
        console.log(res);
        setTrans(res.data.trans);
      })
      .catch(console.log);
  };

  const submitTrans = () => { // arrow/lambda function
    console.log(item);
    console.log(price);
    console.log(quantity);

    const body = {
      item: item,
      price: price,
      quantity: quantity
    };

    axios.post('/api/createTrans', body)
      .then(() => setItem(''))
      .then(() => setPrice(''))
      .then(() => setQuan(''))
      .then(() => fetchTrans()) // fetch after submit
      .catch(console.log);
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
      <nav>
        {appUser && <p>Welcome {appUser}</p>} 
        {appUser === 'admin' &&  <Link to="/management">Management</Link>}
        <Link to="/logout">Logout</Link>
      </nav>
      <h1>Store Page</h1>
      <div>
        <select class="dropdown"  onChange={e => setSelectedItem(e.target.value)}>
        <option disabled selected value>Select An Item</option>
        {items.map((item) => {
              return (
                <option>
                  {parseItem(item)}
                </option>
              ); 
          })}
        </select>
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="testI"></input>
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="testp"></input>
        <input value={parsePrice(selectedItem)} onChange={e => setPrice(e.target.value)} placeholder="Price"></input>
        <input value={quantity} onChange={e => setQuan(e.target.value)} placeholder="Quantity"></input>
        <button onClick={submitTrans}>Add Transaction</button>
      </div>
      <div>
        <p>Shopping Cart:</p>
        <div className="trans-list">
          {items.map((item) => {
            return (
              <div className="trans-item">
                {parsePrice(item)}
                {parseItem(item)}
                {quantity}
              </div>
            ); 
          })}
        </div>
      </div>
    </div>
  );
};

export default Store;