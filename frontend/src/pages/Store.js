import React from 'react';
import axios from 'axios'; // don't forget this
import Notes from '../components/Notes';
import { Redirect } from 'react-router-dom';

const Store = ({appUser, setAppUser}) => {
  // pass in default value into useState
  const [items, setItems] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState('');
  //const [username, setUsername] = React.useState('');
  let itemsMap = new Map();
  const [quantity, setQuan] = React.useState('');

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
        //setItem(res.data.item); // update state variable
        //setPrice(res.data.price);
        //setUsername(res.data.username);
        setQuan(res.data.quantity);
      })
      .catch(console.log);
  };

  const submitTrans = () => { // arrow/lambda function
    //console.log(item);
    //console.log(price);
    //console.log(username);
    console.log(quantity);

    const body = {
      //item: item,
      //price: price,
      //username: username
      quantity: quantity
    };

    axios.post('/api/createTrans', body)
      //.then(() => setPrice(''))
      //.then(() => setItem(''))
      //.then(() => setUsername(''))
      .then(() => setQuan(''))
      .then(() => fetchTrans()) // fetch after submit
      .catch(console.log);
  };

  // this is a hook
  React.useEffect(() => {
    // this will load notes when the page loads
    fetchNotes();
  }, []); // pass empty array

  if(!appUser){
    return <Redirect to="/login" />;
  }

  // jsx
  return (
    <div>
      <h1>Store</h1>
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
        <input value={quantity} onChange={e => setQuan(e.target.value)} placeholder="Quantity"></input>
      </div>
    </div>
  );
};

export default Store;