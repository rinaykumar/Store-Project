import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Items from '../components/Items';

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

  const deleteItem = () => { 
    console.log(item);
    const body = {
      item: item
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
        <button onClick={deleteItem}>Delete Item</button>
      </div>
      <div>
        <p>Inventory:</p>
        <Items items={items}/>
      </div>
    </div>
  );
};

export default Management;