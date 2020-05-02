import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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