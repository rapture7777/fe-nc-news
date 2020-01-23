import '../css/PostArticle.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PostArticle extends Component {
  state = {
    title: '',
    topic: '',
    body: ''
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, topic, body } = this.state;
    const { username, handlePostedArticle } = this.props;
    if (title && topic && body) {
      api
        .postArticle(title, body, topic, username)
        .then(({ data: { article } }) => handlePostedArticle(article));
    }
  };

  render() {
    return (
      <form className="PostArticle" onSubmit={this.handleSubmit}>
        <label htmlFor="title" className="Title">
          Title: <input type="text" id="title" onChange={this.handleChange} />
        </label>
        <label htmlFor="topic">
          {' '}
          Topic:
          <select id="topic" className="Topic" onChange={this.handleChange}>
            <option value="">Select Topic</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
            <option value="football">Football</option>
          </select>
        </label>
        <label htmlFor="body" className="Body">
          Body: <input type="text" id="body" onChange={this.handleChange} />
        </label>
        <Button variant="success" className="Submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default PostArticle;
