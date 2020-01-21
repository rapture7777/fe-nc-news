import '../css/PostComment.css';
import React, { Component } from 'react';
import * as api from '../utils/api';

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
    api.postComment(article_id, username, body).then(() => {
      this.setState({ body: '' }, () => {
        handleNewComment();
      });
    });
  };

  render() {
    const { body } = this.state;
    return (
      <form className="PostComment" onSubmit={this.handleSubmit}>
        <p className="Text">Post a comment:</p>
        <label htmlFor="body" className="Box">
          <input
            type="text"
            id="body"
            value={body}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </label>
      </form>
    );
  }
}

export default PostComment;
