import React, { Component } from 'react';
import '../css/Login.css';
import axios from 'axios';

class Login extends Component {
  state = {
    username: ''
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ username: value }, () => {
      console.log(this.state.username);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { loginSuccessful } = this.props;
    axios
      .get('https://nc-news-asv.herokuapp.com/api/users')
      .then(res => console.log(res));
  };

  render() {
    const { username } = this.state;

    return (
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
      </form>
    );
  }
}

export default Login;
