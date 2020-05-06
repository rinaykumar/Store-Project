import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Signup = ({appUser, setAppUser}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleAuth = () =>{
    const body = {
      username: username,
      password: password,
    };
    axios.post('/api/register', body)
      .then((res) =>{
        console.log(res.data);
        if(res.data.success){
          console.log('Worked!');
          setAppUser(username);
        }else{
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError("Failed to register");
      });
  };

  if(appUser){
    return <Redirect to="/userpage"/>;
  }

  return (
    <div>
      <h1>Signup</h1>
      <div>
        <input 
          value = {username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input 
          type="password"
          value = {password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button disabled={!username || !password} onClick={handleAuth}>Sign up</button>
      </div>
      {error && <strong>{error}</strong>}
    </div>
  );
};

export default Signup;
