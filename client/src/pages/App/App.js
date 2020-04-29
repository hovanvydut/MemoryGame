import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MemoryGame from './../MemoryGame/MemoryGame';
import Login from './../Login/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/memorygame">
            <MemoryGame />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">abc</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
