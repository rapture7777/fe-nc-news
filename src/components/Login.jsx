import React, { Component } from 'react';
import '../css/Login.css';
import * as api from '../utils/api.js';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  state = {
    username: '',
    users: []
  };

  componentDidMount() {
    api.fetchUsers().then(({ data: { users } }) => {
      this.setState({ users });
    });
  }

  handleChange = event => {
    console.log(event.target.value);
    const { value } = event.target;
    this.setState({ username: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    const { loginSuccessful } = this.props;
    loginSuccessful(username);
  };

  render() {
    const { username, users } = this.state;

    return (
      <Form className="Login" onSubmit={this.handleSubmit}>
        <p>
          Welcome to ncNews.
          <br />
          Please select your username below to log in...
        </p>
        <Form.Label htmlFor="username">
          <Form.Control
            as="select"
            id="username"
            value={username}
            onChange={this.handleChange}
          >
            <option>Select User</option>
            {users.map(function(user) {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </Form.Control>
        </Form.Label>
        <Form.Label htmlFor="submit">
          <Button variant="secondary" id="submit" type="submit">
            Login
          </Button>
        </Form.Label>
      </Form>
    );
  }
}

export default Login;
