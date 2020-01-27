import React, { Component } from 'react';
import '../css/Login.css';
import * as api from '../utils/api.js';

class Login extends Component {
  state = {
    username: '',
    invalidUsername: false
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ username: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    const { loginSuccessful } = this.props;
    api.fetchUsers().then(({ data: { users } }) => {
      const usernameArr = users.map(user => user.username);
      if (usernameArr.includes(username)) {
        this.setState({ invalidUsername: false });
        loginSuccessful(username);
      } else {
        this.setState({ invalidUsername: true });
      }
    });
  };

  render() {
    const { username, invalidUsername } = this.state;

    return (
      <>
        <form className="Login" onSubmit={this.handleSubmit}>
          <p>Enter your username:</p>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="submit">
            <button id="submit">Login</button>
          </label>
          {invalidUsername && <h3>Invalid Username, please try again!</h3>}
        </form>
      </>
    );
  }
}

export default Login;
