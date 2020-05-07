import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Store from './pages/Store';
import Management from './pages/Management';
import Logout from './pages/Logout';

const App = () => {
  const [appUser, setAppUser] = React.useState('');

  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/logout">
          <Logout appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/store">
          <Store appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/management">
          <Management appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/">
          <Login appUser={appUser} setAppUser={setAppUser} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;