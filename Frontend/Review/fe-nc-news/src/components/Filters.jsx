import React from 'react';

const Filters = ({ handleChange }) => {
  return (
    <section className="Filters">
      Choose Topic:{' '}
      <select id="topic" onChange={handleChange}>
        <option value=""></option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="football">Football</option>
      </select>
    </section>
  );
};

export default Filters;
