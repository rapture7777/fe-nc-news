import '../css/CommentSingle.css';
import React from 'react';

const CommentSingle = ({ commentsData, username, handleDeleteComment }) => {
  return commentsData.map(function(comment) {
    const { votes, body, author, created_at, comment_id } = comment;
    return (
      <section className="CommentSingle" key={comment_id}>
        <p className="Votes">{votes}</p>
        <p className="Body">{body}</p>
        <p className="Info">
          {author} - {created_at}
        </p>
        {username === author && (
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
