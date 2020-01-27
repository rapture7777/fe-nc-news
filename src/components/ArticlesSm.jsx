import React from 'react';
import '../css/ArticlesSm.css';
import { Link } from '@reach/router';
import Vote from './Vote';

const ArticlesSm = ({ articles }) => {
  return articles.map(function(article) {
    const { article_id, title, topic, author, created_at, votes } = article;
    return (
      <section className="ArticlePreview" key={article_id}>
        <Link className="Title" to={`/articles/${article_id}`}>
          <p className="Title">
            <b>{title}</b>
          </p>
        </Link>
        <p className="Info">
          {topic} - {author} - {created_at}
        </p>
        <Vote
          name="articleVote"
          className="Votes"
          votes={votes}
          id={article_id}
        />
      </section>
    );
  });
};

export default ArticlesSm;
