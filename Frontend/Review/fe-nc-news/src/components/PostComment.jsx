import '../css/PostComment.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import { Button, Form } from 'react-bootstrap';

class PostComment extends Component {
  state = {
    body: ''
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ body: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { article_id, username, handleNewComment } = this.props;
    const { body } = this.state;
    if (body !== '') {
      handleNewComment(username, body);
      api.postComment(article_id, username, body).then(() => {
        this.setState({ body: '' });
      });
    }
  };

  render() {
    const { body } = this.state;
    return (
      <Form className="PostComment" onSubmit={this.handleSubmit}>
        <Form.Label htmlFor="body" className="Box">
          <Form.Control
            type="text"
            id="body"
            value={body}
            onChange={this.handleChange}
            placeholder="Post Comment..."
          />
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form.Label>
      </Form>
    );
  }
}

export default PostComment;
