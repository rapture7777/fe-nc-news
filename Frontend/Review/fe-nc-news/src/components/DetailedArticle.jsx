import '../css/DetailedArticle.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import Vote from './Vote';

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
      articleData: { article_id, title, body, votes, topic, author, created_at }
    } = this.state;
    const { username } = this.props;
    return (
      <section className="DetailedArticle">
        <p className="Title">
          <b>{title}</b>
        </p>
        <Vote
          name="articleVote"
          className="Votes"
          votes={votes}
          id={article_id}
        />
        <p className="Body">{body}</p>
        <p className="Topic">{topic}</p>
        <p className="Author">{author}</p>
        <p className="CreatedAt">{created_at}</p>
        {username === author && <button className="Delete">Delete</button>}
      </section>
    );
  }
}

export default DetailedArticle;
