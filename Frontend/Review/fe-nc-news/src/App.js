import React, { Component } from 'react';
import './css/App.css';
import './css/Router.css';
import { Router } from '@reach/router';
import Login from './components/Login';
import TopBar from './components/TopBar';
import Carousel from './components/Carousel';
import Articles from './components/Articles';

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
          <Login className="Router" loginSuccessful={this.loginSuccessful} />
        ) : (
          <>
            <Carousel className="TopWindow" />
            <Articles className="MainList" />
          </>
        )}
      </main>
    );
  }
}

export default App;
