import React from 'react';
import { Redirect } from 'react-router-dom';

const Management = ({appUser, setAppUser}) => {
  if (appUser !== 'admin') {
    return <Redirect to="/"/>;
  }
  
  return (
    <div>
      <h1>Management</h1>
    </div>
  );
};

export default Management;