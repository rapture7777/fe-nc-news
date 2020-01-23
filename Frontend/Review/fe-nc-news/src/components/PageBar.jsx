import '../css/PageBar.css';
import React from 'react';
import { Button } from 'react-bootstrap';

const PageBar = ({ handlePageChange }) => {
  return (
    <div className="PageBarInner">
      <Button variant="secondary" onClick={handlePageChange}>
        <b>More</b>
      </Button>
    </div>
  );
};

export default PageBar;
