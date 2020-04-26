import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Management = ({appUser, setAppUser}) => {
  const [item, setItem] = React.useState(''); 
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
    console.log(item);
    const body = {
      item: item
    };
    axios.post('/api/addItem', body)
      .then(() => setItem(''))
      .then(() => fetchItems())
      .catch(console.log);
  };

  const deleteItem = (itemName) => { 
    console.log("From deleteItem");
    console.log(itemName);
    const body = {
      item: itemName
    };
    axios.post('/api/deleteItem', body)
      .then(() => setItem(''))
      .then(() => fetchItems())
      .catch(console.log);
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  if (appUser !== 'admin') {
    return <Redirect to="/"/>;
  }

  return (
    <div>
      <div>
        <nav>
          {appUser && <p>Welcome {appUser}</p>} 
          <Link to="/store">Store</Link> 
          <Link to="/logout">Logout</Link>
        </nav>
        <h1>Management Page</h1>
      </div>
      <div>
        <input placeholder="Price"/>
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item Name"/>
        <button onClick={submitItem}>Add Item</button>
      </div>
      <div>
        <p>Inventory:</p>
        <div className="items-list">
          {items.map((item) => {
            return (
              <div className="items-item">
                {item}
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