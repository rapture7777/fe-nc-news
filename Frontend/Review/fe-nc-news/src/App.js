import React, { Component } from 'react';
import './css/App.css';
import { Router } from '@reach/router';
import Login from './components/Login';
import TopBar from './components/TopBar';
import Carousel from './components/Carousel';

class App extends Component {
  state = {
    username: 'grumpy19',
    loggedIn: true
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
          <Router>
            <Carousel path="/" className="TopWindow" />
          </Router>
        )}
      </main>
    );
  }
}

export default App;
