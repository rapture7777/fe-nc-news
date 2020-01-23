import '../css/PageBar.css';
import React from 'react';

const PageBar = ({ handlePageChange }) => {
  return (
    <div className="PageBarInner">
      <button onClick={handlePageChange}>More</button>
    </div>
  );
};

export default PageBar;
