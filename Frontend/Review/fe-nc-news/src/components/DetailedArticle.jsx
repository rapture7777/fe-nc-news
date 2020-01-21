import '../css/DetailedArticle.css';
import React, { Component } from 'react';
import * as api from '../utils/api';

class DetailedArticle extends Component {
  state = {
    articleData: {}
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchDetailedArticle(article_id).then(({ data: { article } }) => {
      this.setState({ articleData: article });
    });
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      api.fetchDetailedArticle(article_id).then(({ data: { article } }) => {
        this.setState({ articleData: article });
      });
    }
  }

  render() {
    const {
      articleData: { title, body, votes, topic, author, created_at }
    } = this.state;
    return (
      <section className="DetailedArticle">
        <p className="Title">
          <b>{title}</b>
        </p>
        <p className="Votes">{votes}</p>
        <p className="Body">{body}</p>
        <p className="Topic">{topic}</p>
        <p className="Author">{author}</p>
        <p className="CreatedAt">{created_at}</p>
        <button className="Delete">Delete</button>
      </section>
    );
  }
}

export default DetailedArticle;
