import React from 'react';
import '../css/ArticlesSm.css';
import { Link } from '@reach/router';

const ArticlesSm = ({ articles }) => {
  return articles.map(function(article) {
    return (
      <section className="ArticlePreview" key={article.article_id}>
        <Link to={`/articles/${article.article_id}`}>
          <b>
            <p className="Title">{article.title}</p>
          </b>
        </Link>
        <p className="Info">
          {article.topic} - {article.author} - {article.created_at}
        </p>
        <p className="Votes">{article.votes}</p>
      </section>
    );
  });
};

export default ArticlesSm;
