import React, { Component } from 'react';
import './css/App.css';
import { Router } from '@reach/router';
import Login from './components/Login';
import TopBar from './components/TopBar';

class App extends Component {
  state = {
    username: '',
    loggedIn: false
  };

  loginSuccessful = username => {
    this.setState({ username: username, loggedIn: true });
  };

  render() {
    const { username, loggedIn } = this.state;
    return (
      <main className="App">
        <TopBar username={username} loggedIn={loggedIn} />
        {!loggedIn ? (
          <Login className="TopWindow" loginSuccessful={this.loginSuccessful} />
        ) : (
          <h1>Welcome to NC News!</h1>
        )}
        ;
      </main>
    );
  }
}

export default App;
