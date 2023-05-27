import './App.css';
import React from 'react'
import { AuthContext } from "./helpers/authContext";
import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Home from './pages/home';
import createPost from './pages/createPost';
import Post from './pages/Post';
import Reg from './pages/reg';
import Login from './pages/login';
import axios from "axios";


function App() {
  let history = useHistory()
  const [username, setusername] = useState("")
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  

  useEffect(() => {
    axios // this will verify the token in the server to set the auth state and returns username and all that
      .get("http://localhost:3001/auth/logchek", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status: false});// use ... when you only want to change some of the fields
        } else {
          setAuthState({
            username:response.data.username,
            id: response.data.id,
            status: true
          });
        }
      });
  }, []);
  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username: "",
    id: 0,
    status: false});
    //history.push("/log");
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}> {/* now auth state and setauth will be aaccesseble from all the componenets under this tag */}
        <Router>  {/* this is like navigator in flutter, 
                 goes to the component of the give path that will be a react page */}
          <div className="navbar">
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> Create A Post</Link>
            {!authState.status ?(
              <>
                <Link to="/log"> Login</Link>
                <Link to="/reg"> reg</Link>
              </>
            ):<button onClick={logout}>Logout</button>
            }
          </div>

            <h1>{authState.username}</h1>
          <Switch>   {/* to select routes we use switch, this doesnt take you to that page
                    just loads the componet you gave on the route on the current page */}
            <Route path='/' exact component={Home} />
            <Route path='/createpost' exact component={createPost} />
            <Route path='/post/:id' exact component={Post} />
            <Route path='/log' exact component={Login} />
            <Route path='/reg' exact component={Reg} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
