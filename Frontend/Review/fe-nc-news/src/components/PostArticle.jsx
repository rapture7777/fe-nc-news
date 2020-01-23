import '../css/PostArticle.css';
import * as api from '../utils/api';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

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
      <Form className="PostArticle" onSubmit={this.handleSubmit}>
        <Form.Label htmlFor="title" className="Title">
          <Form.Control
            type="text"
            id="title"
            onChange={this.handleChange}
            placeholder="Title"
          />
        </Form.Label>
        <Form.Label htmlFor="topic">
          <Form.Control
            as="select"
            id="topic"
            className="Topic"
            onChange={this.handleChange}
          >
            <option value="">Select Topic</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
            <option value="football">Football</option>
          </Form.Control>
        </Form.Label>
        <Form.Label htmlFor="body" className="Body">
          <Form.Control
            type="text"
            id="body"
            onChange={this.handleChange}
            placeholder="Comment here..."
          />
        </Form.Label>
        <Button variant="success" type="submit" className="Submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default PostArticle;
