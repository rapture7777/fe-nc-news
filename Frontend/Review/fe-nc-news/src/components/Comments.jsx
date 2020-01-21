import '../css/Comments.css';
import React, { Component } from 'react';
import * as api from '../utils/api';
import Filters from './Filters';
import CommentSingle from './CommentSingle';

class Comments extends Component {
  state = {
    commentsData: []
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchComments(article_id).then(({ data: { comments } }) => {
      this.setState({ commentsData: comments });
    });
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      api.fetchComments(article_id).then(({ data: { comments } }) => {
        this.setState({ commentsData: comments });
      });
    }
  }

  render() {
    const { commentsData } = this.state;
    return (
      <section className="Comments">
        <Filters className="Filters" />
        <section className="CommentSm">
          <CommentSingle commentsData={commentsData} />
        </section>
      </section>
    );
  }
}

export default Comments;
