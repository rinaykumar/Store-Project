import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Management = ({appUser, setAppUser}) => {
  if (appUser !== 'admin') {
    return <Redirect to="/"/>;
  }
  
  return (
    <div>
      <nav>
        {appUser && <p>Welcome {appUser}</p>} 
        <Link to="/store">Store</Link> 
        <Link to="/logout">Logout</Link>
      </nav>
      <h1>Management Page</h1>
    </div>
  );
};

export default Management;