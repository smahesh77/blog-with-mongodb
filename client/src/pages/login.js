import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/authContext";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Reg from "./reg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext) // we are accessing stuff in app.js cause we are passing it through this context how cool is that

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("https://blog-b1g5.onrender.com/auth/login", data).then((response) => {
      if (response.data.error) {  // all errors will come here, will be only true when there is a error
        alert(response.data.error);
      } else {// use else or it  will create an empty token in storage
        //sessionStorage.setItem("accessToken", response.data); this will get lost when we close the tab to prevent this we use local storage
        localStorage.setItem("accessToken", response.data.token);// this will keep us signedin in even different tabs
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
      
    </div>
  );
}

export default Login;