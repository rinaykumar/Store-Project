import React from 'react';
import axios from 'axios'; // don't forget this
import Notes from '../components/Notes';
import { Redirect } from 'react-router-dom';

const Store = ({appUser, setAppUser}) => {
  // pass in default value into useState
  const [note, setNote] = React.useState(''); // create a state variable + setter
  const [notes, setNotes] = React.useState(['Demo note']); // if map of undefined 
  const [item, setItem] = React.useState('');
  const [price, setPrice] = React.useState('');

  const fetchTrans = () => {
    // utility to get all notes
    axios.get('/api/getTrans')
      .then((res) => {
        console.log(res);
        setItem(res.data.item); // update state variable
        setPrice(res.data.price);
      })
      .catch(console.log);
  };

  const submitTrans = () => { // arrow/lambda function
    console.log(item);
    console.log(price);

    const body = {
      item: item,
      price: price
    };

    axios.post('/api/createTrans', body)
      .then(() => setPrice(''))
      .then(() => setItem(''))
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
        <div>
          <input value={item} onChange={e => setItem(e.target.value)} />
          <input value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <button onClick={submitTrans}>Add</button>
        </div>
        <div>
          <Notes notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default Store;