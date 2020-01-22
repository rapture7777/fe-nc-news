import '../css/PostArticle.css';
import * as api from '../utils/api';
import React, { Component } from 'react';

class PostArticle extends Component {
  state = {
    title: '',
    topic: '',
    body: ''
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value }, () => {
      console.log(this.state[id]);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, topic, body } = this.state;
    const { username } = this.props;
    if (title && topic && body) {
      api
        .postArticle(title, body, topic, username)
        .then(({ data: { article } }) => console.log(article));
    }
  };

  render() {
    return (
      <form className="PostArticle" onSubmit={this.handleSubmit}>
        <p className="Header">Post an Article (all fields required):</p>
        <label htmlFor="title" className="Title">
          Title: <input type="text" id="title" onChange={this.handleChange} />
        </label>
        <select id="topic" className="Topic" onChange={this.handleChange}>
          <option value="">Select Topic</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
        <label htmlFor="body" className="Body">
          Body: <input type="text" id="body" onChange={this.handleChange} />
        </label>
        <button className="Submit">Submit</button>
      </form>
    );
  }
}

export default PostArticle;
