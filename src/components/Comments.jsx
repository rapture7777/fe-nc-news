import '../css/Comments.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import CommentSingle from './CommentSingle';
import PostComment from './PostComment';
import DisplayError from './DisplayError';
import { Spinner } from 'react-bootstrap';

class Comments extends Component {
  state = {
    commentsData: [],
    commentDeleted: false,
    isLoading: true,
    err: ''
  };

  commentsFormat = data => {
    return data.map(function(comment) {
      let newComment = { ...comment };
      newComment.created_at = `${newComment.created_at.slice(
        0,
        10
      )} @ ${newComment.created_at.slice(12, 16)}`;
      return newComment;
    });
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .fetchComments(article_id)
      .then(({ data: { comments } }) => {
        let moddedComments = this.commentsFormat(comments);
        this.setState({ commentsData: moddedComments, isLoading: false });
      })
      .catch(({ response: { data: { msg } } }) => this.setState({ err: msg }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    const { commentDeleted } = this.state;
    if (
      article_id !== prevProps.article_id ||
      commentDeleted !== prevState.commentDeleted
    ) {
      api
        .fetchComments(article_id)
        .then(({ data: { comments } }) => {
          let moddedComments = this.commentsFormat(comments);
          this.setState({
            commentsData: moddedComments,
            commentDeleted: false
          });
        })
        .catch(({ response: { data: { msg } } }) =>
          this.setState({ err: msg })
        );
    }
  }

  handleNewComment = (username, body) => {
    let newComment = {
      votes: 1,
      created_at: 'Just now',
      author: username,
      body: body
    };
    this.setState(currentState => {
      return {
        commentsData: [newComment, ...currentState.commentsData]
      };
    });
  };

  handleDeleteComment = id => {
    api
      .deleteComment(id)
      .then(() => {
        this.setState({ commentDeleted: true });
      })
      .catch(({ response: { data: { msg } } }) => this.setState({ err: msg }));
  };

  render() {
    const { commentsData, err, isLoading } = this.state;
    const { username, article_id } = this.props;
    return err ? (
      <DisplayError err={err} />
    ) : !isLoading ? (
      <section className="Comments">
        <h5 className="Title">Comments</h5>
        <section className="CommentSm">
          <CommentSingle
            commentsData={commentsData}
            username={username}
            handleDeleteComment={this.handleDeleteComment}
          />
        </section>
        <section className="Post">
          <PostComment
            username={username}
            article_id={article_id}
            handleNewComment={this.handleNewComment}
          />
        </section>
      </section>
    ) : (
      <Spinner animation="border" variant="secondary" className="Loader" />
    );
  }
}

export default Comments;
