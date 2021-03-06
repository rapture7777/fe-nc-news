import React, { Component } from 'react';
import './css/App.css';
import { Router } from '@reach/router';
import Login from './components/Login';
import TopBar from './components/TopBar';
import DisplayCarousel from './components/Carousel';
import Articles from './components/Articles';
import DetailedArticle from './components/DetailedArticle';
import Comments from './components/Comments';
import DisplayError from './components/DisplayError';

class App extends Component {
  state = {
    username: '',
    loggedIn: false
  };

  componentDidMount() {
    if (localStorage.getItem('username')) {
      const username = localStorage.getItem('username');
      this.setState({ username: username, loggedIn: true });
    }
  }

  loginSuccessful = username => {
    this.setState({ username: username, loggedIn: true }, () => {
      localStorage.setItem('username', username);
    });
  };

  logOut = () => {
    this.setState({ username: '', loggedIn: false }, () => {
      localStorage.clear();
    });
  };

  render() {
    const { username, loggedIn } = this.state;
    return (
      <main className="App">
        <TopBar logOut={this.logOut} username={username} loggedIn={loggedIn} />
        {!loggedIn ? (
          <Login className="Router" loginSuccessful={this.loginSuccessful} />
        ) : (
          <>
            <Router className="TopWindow">
              <DisplayCarousel path="/" className="TopWindow" />
              <DetailedArticle
                path="/articles/:article_id"
                className="TopWindow"
                username={username}
              />
              <DisplayError default />
            </Router>
            <Router className="MainList">
              <Articles path="/" className="MainList" username={username} />
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
