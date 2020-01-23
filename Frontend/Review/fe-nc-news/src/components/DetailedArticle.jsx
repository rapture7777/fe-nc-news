import '../css/DetailedArticle.css';
import '../css/Loader.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import Vote from './Vote';
import DisplayError from './DisplayError';

class DetailedArticle extends Component {
  state = {
    articleData: {},
    isLoading: true,
    err: '',
    articleDeleted: false
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .fetchDetailedArticle(article_id)
      .then(({ data: { article } }) => {
        this.setState({ articleData: article, isLoading: false });
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
        created_at,
        comment_count
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
            <button className="Delete" onClick={this.handleDeleteArticle}>
              <b>X</b>
            </button>
          )}
        </section>
      ) : (
        <div className="DetailedArticle lds-hourglass"></div>
      )
    ) : (
      <h3 className="Deleted">Deleted!</h3>
    );
  }
}

export default DetailedArticle;
