import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './index.css';

import Navigation from './components/Navigation.jsx';
import News from './components/News.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';

import UserGlobal from './global/UserGlobal';

function App() {
  return (
    <Router>
      <div>

        <Navigation />

        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
