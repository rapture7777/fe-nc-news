import '../css/CommentSingle.css';
import React from 'react';
import Vote from './Vote';
import { Button } from 'react-bootstrap';

const CommentSingle = ({ commentsData, username, handleDeleteComment }) => {
  return commentsData.map(function(comment) {
    const { votes, body, author, created_at, comment_id } = comment;
    return (
      <section className="CommentSingle" key={comment_id}>
        <Vote name="commentVote" id={comment_id} votes={votes} />
        <p className="Body">{body}</p>
        <p className="Info">
          <b>
            {author} - {created_at}
          </b>
        </p>
        {username === author && comment_id && (
          <Button
            variant="danger"
            onClick={() => handleDeleteComment(comment_id)}
            className="Delete"
          >
            <b>X</b>
          </Button>
        )}
      </section>
    );
  });
};

export default CommentSingle;
