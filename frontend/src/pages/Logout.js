import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({appUser, setAppUser}) => {
    console.log("Logout");
    setAppUser("");
    return <Redirect to="/"/>;
};

export default Logout;