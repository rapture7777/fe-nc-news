import '../css/Comments.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import CommentSingle from './CommentSingle';
import PostComment from './PostComment';
import DisplayError from './DisplayError';
import PageBar from './PageBar';

class Comments extends Component {
  state = {
    commentsData: [],
    commentDeleted: false,
    isLoading: false,
    err: ''
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .fetchComments(article_id)
      .then(({ data: { comments } }) => {
        this.setState({ commentsData: comments });
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
          this.setState({
            commentsData: comments,
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
      votes: 0,
      created_at: 'Just now',
      author: username,
      body: body
    };
    this.setState(currentState => {
      return {
        commentPosted: true,
        commentsData: [newComment, ...currentState.commentsData]
      };
    });
  };

  handleDeleteComment = event => {
    const { id } = event.target;
    api
      .deleteComment(id)
      .then(() => {
        this.setState({ commentDeleted: true });
      })
      .catch(({ response: { data: { msg } } }) => this.setState({ err: msg }));
  };

  render() {
    const { commentsData, err } = this.state;
    const { username, article_id } = this.props;
    return err ? (
      <DisplayError err={err} />
    ) : (
      <section className="Comments">
        <h5 className="Title">Comments</h5>
        <section className="CommentSm">
          <CommentSingle
            commentsData={commentsData}
            username={username}
            handleDeleteComment={this.handleDeleteComment}
          />
        </section>
        <section className="PageBar">
          <PageBar />
        </section>
        <section className="Post">
          <PostComment
            username={username}
            article_id={article_id}
            handleNewComment={this.handleNewComment}
          />
        </section>
      </section>
    );
  }
}

export default Comments;
