import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../components/login/Login.css';

async function loginUser(credentials: { username: any; password: any; }) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Login(props: any) {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        /***const token = await loginUser({
          username,
          password
        });***/
        //props.setToken(username);
    }

    return(
        <div className="login-container">
            <div className="login-header">
                <h1>Please Log In</h1>
            </div>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                <label>
                    <span>Username</span>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <p></p>
                <label>
                    <span>Password</span>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
                </form>
            </div>
      </div>
    )
}
  
Login.propTypes = {
    setUserType: PropTypes.func.isRequired
};