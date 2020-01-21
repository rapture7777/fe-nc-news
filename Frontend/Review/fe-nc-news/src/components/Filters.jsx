import React from 'react';

const Filters = ({ handleArticlesChange }) => {
  return (
    <section className="Filters">
      Choose Topic:{' '}
      <select id="topic" onChange={handleArticlesChange}>
        <option value="">All</option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="football">Football</option>
      </select>
      Sort-by:{' '}
      <select id="sort_by" onChange={handleArticlesChange}>
        <option value=""></option>
        <option value="created_at">Most Recent</option>
        <option value="comment_count">Most Commented</option>
        <option value="votes">Most Popular</option>
      </select>
    </section>
  );
};

export default Filters;
