import React, { Component } from 'react';
import './css/App.css';
import { Router } from '@reach/router';
import Login from './components/Login';
import TopBar from './components/TopBar';
import Carousel from './components/Carousel';
import Articles from './components/Articles';
import DetailedArticle from './components/DetailedArticle';
import Comments from './components/Comments';

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
            <Router className="TopWindow">
              <Carousel path="/" className="TopWindow" />
              <DetailedArticle
                path="/articles/:article_id"
                className="TopWindow"
                username={username}
              />
            </Router>
            <Router className="MainList">
              <Articles path="/" className="MainList" />
              <Comments
                path="/articles/:article_id"
                className="MainList"
                username={username}
              />
            </Router>
          </>
        )}
      </main>
    );
  }
}

export default App;
