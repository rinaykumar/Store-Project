import React from 'react';
import { Redirect } from 'react-router-dom';

const Store = ({appUser, setAppUser}) => {
  if (!appUser) {
    return <Redirect to="/"/>;
  }
  
  return (
    <div>
      <h1>Store</h1>
    </div>
  );
};

export default Store;