import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Store = ({appUser, setAppUser}) => {
  if (!appUser) {
    return <Redirect to="/"/>;
  }
  
  return (
    <div>
      <nav>
        {appUser && <p>Welcome {appUser}</p>} 
        {appUser === 'admin' &&  <Link to="/management">Management</Link>}
        <Link to="/logout">Logout</Link>
      </nav>
      <h1>Store Page</h1>
    </div>
  );
};

export default Store;