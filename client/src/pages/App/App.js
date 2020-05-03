import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './../Home/Home';
import MemoryGame from './../MemoryGame/MemoryGame';
import SignIn from './../SignIn/SignIn';
import SignUp from './../SignUp/SignUp';
import './App.css';

// NOTE custom route cho link signin, signup để cho người dùng đã đăng nhập là không truy cập được

function PrivateRoute({ MyComponent, tokenAuthen, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location, history }) => {
        if (tokenAuthen) return <MyComponent history={history} />;
        else return <Redirect to="/signin" />;
      }}
    />
  );
}

class App extends Component {
  render() {
    const { tokenAuthen } = this.props;

    return (
      <Router>
        <Switch>
          <PrivateRoute
            path="/memorygame"
            tokenAuthen={tokenAuthen}
            MyComponent={MemoryGame}
          />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/" tokenAuthen={tokenAuthen} MyComponent={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tokenAuthen: state.signin.token,
  };
};

export default connect(mapStateToProps, null)(App);
