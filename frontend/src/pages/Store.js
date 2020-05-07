import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Store = ({appUser, setAppUser}) => {
  const [selectedItem, setSelectedItem] = React.useState('');
  const [items, setItems] = React.useState([]);
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
        <select class="dropdown" onChange={e => setSelectedItem(e.target.value)}>
        <option disabled selected value>Select An Item</option>
        {items.map((item) => {
              return (
                <option>
                  {parseItem(item)}
                </option>
              ); 
          })}
        </select>
        <input value={parsePrice(selectedItem)} placeholder="Price"></input>
        <input value="" placeholder="Quantity"></input>
      </div>
    </div>
  );
};

export default Store;