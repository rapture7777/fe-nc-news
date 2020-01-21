import '../css/CommentSingle.css';
import React from 'react';
import Vote from './Vote';

const CommentSingle = ({ commentsData, username, handleDeleteComment }) => {
  return commentsData.map(function(comment) {
    const { votes, body, author, created_at, comment_id } = comment;
    return (
      <section className="CommentSingle" key={comment_id}>
        <Vote name="commentVote" id={comment_id} votes={votes} />
        <p className="Body">{body}</p>
        <p className="Info">
          {author} - {created_at}
        </p>
        {username === author && comment_id && (
          <button
            id={comment_id}
            onClick={handleDeleteComment}
            className="Delete"
          >
            Delete
          </button>
        )}
      </section>
    );
  });
};

export default CommentSingle;
