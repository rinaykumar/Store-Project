import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Store from './pages/Store';
import Management from './pages/Management';

const App = () => {
  const [appUser, setAppUser] = React.useState('');

  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login appUser={appUser} setAppUser={setAppUser} />
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
      </BrowserRouter>
    </div>
  );
};

export default App;