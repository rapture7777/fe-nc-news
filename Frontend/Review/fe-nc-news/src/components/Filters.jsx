import React from 'react';
import { Form } from 'react-bootstrap';

const Filters = ({ handleArticlesChange }) => {
  return (
    <Form className="Filters">
      <Form.Label htmlFor="topic">
        <Form.Control as="select" id="topic" onChange={handleArticlesChange}>
          <option value="">Topic: All</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </Form.Control>
      </Form.Label>

      <Form.Label htmlFor="sort_by">
        <Form.Control as="select" id="sort_by" onChange={handleArticlesChange}>
          <option value="">Sort By: Most Recent</option>
          <option value="comment_count">Most Commented</option>
          <option value="votes">Most Popular</option>
        </Form.Control>
      </Form.Label>
    </Form>
  );
};

export default Filters;
