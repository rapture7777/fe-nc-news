import '../css/Comments.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import CommentSingle from './CommentSingle';
import PostComment from './PostComment';

class Comments extends Component {
  state = {
    commentsData: [],
    commentPosted: false,
    commentDeleted: false
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchComments(article_id).then(({ data: { comments } }) => {
      this.setState({ commentsData: comments });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    const { commentPosted, commentDeleted } = this.state;
    if (
      article_id !== prevProps.article_id ||
      commentPosted !== prevState.commentPosted ||
      commentDeleted !== prevState.commentDeleted
    ) {
      api.fetchComments(article_id).then(({ data: { comments } }) => {
        this.setState({
          commentsData: comments,
          commentPosted: false,
          commentDeleted: false
        });
      });
    }
  }

  handleNewComment = () => {
    this.setState({ commentPosted: true });
  };

  handleDeleteComment = event => {
    const { id } = event.target;
    api.deleteComment(id).then(() => {
      this.setState({ commentDeleted: true });
    });
  };

  render() {
    const { commentsData } = this.state;
    const { username, article_id } = this.props;
    return (
      <section className="Comments">
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
    );
  }
}

export default Comments;
