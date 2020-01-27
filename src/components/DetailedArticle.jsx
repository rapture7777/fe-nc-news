import '../css/DetailedArticle.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import Vote from './Vote';
import DisplayError from './DisplayError';
import { Button, Spinner } from 'react-bootstrap';

class DetailedArticle extends Component {
  state = {
    articleData: {},
    isLoading: true,
    err: '',
    articleDeleted: false
  };

  detailedArticleFormat = data => {
    let newArticle = { ...data };
    newArticle.topic =
      newArticle.topic.slice(0, 1).toUpperCase() +
      newArticle.topic.slice(1, newArticle.topic.length);
    newArticle.created_at = `${newArticle.created_at.slice(
      0,
      10
    )} @ ${newArticle.created_at.slice(12, 16)}`;
    return newArticle;
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .fetchDetailedArticle(article_id)
      .then(({ data: { article } }) => {
        let moddedArticle = this.detailedArticleFormat(article);
        this.setState({ articleData: moddedArticle, isLoading: false });
      })
      .catch(({ response: { data: { msg } } }) => this.setState({ err: msg }));
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      api
        .fetchDetailedArticle(article_id)
        .then(({ data: { article } }) => {
          this.setState({ articleData: article });
        })
        .catch(({ response: { data: { msg } } }) =>
          this.setState({ err: msg })
        );
    }
  }

  handleDeleteArticle = () => {
    const { article_id } = this.props;
    api
      .deleteArticle(article_id)
      .then(() => {
        this.setState({ articleDeleted: true });
      })
      .catch(({ response: { data: { msg } } }) => this.setState({ err: msg }));
  };

  render() {
    const {
      articleData: {
        article_id,
        title,
        body,
        votes,
        topic,
        author,
        created_at
      },
      err,
      articleDeleted,
      isLoading
    } = this.state;
    const { username } = this.props;
    return err ? (
      <DisplayError err={err} />
    ) : !articleDeleted ? (
      !isLoading ? (
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
          <p className="Info">
            <b>
              {topic} - {author} - {created_at}
            </b>
          </p>
          {username === author && (
            <Button
              variant="danger"
              className="Delete"
              onClick={this.handleDeleteArticle}
            >
              <b>X</b>
            </Button>
          )}
        </section>
      ) : (
        <Spinner animation="border" variant="secondary" className="Loader" />
      )
    ) : (
      <h3 className="Deleted">Deleted!</h3>
    );
  }
}

export default DetailedArticle;
