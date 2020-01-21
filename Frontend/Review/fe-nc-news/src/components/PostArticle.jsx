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
    this.setState({ [id]: value });
  };

  render() {
    return (
      <form className="PostArticle">
        <p className="Header">Post an Article:</p>
        <label htmlFor="Title" className="Title">
          Title: <input type="text" id="Title" onChange={this.handleChange} />
        </label>
        <select id="topic" className="Topic" onChange={this.handleChange}>
          <option value="">Select Topic</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
        <label htmlFor="Body" className="Body">
          Body: <input type="text" id="Body" onChange={this.handleChange} />
        </label>
        <button className="Submit">Submit</button>
      </form>
    );
  }
}

export default PostArticle;
