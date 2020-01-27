import React from 'react';
import cat from '../img/error.jpeg';

const DisplayError = ({ err }) => {
  return err ? (
    <div className="Error">
      <h3>Woops! {err}</h3>
      <img src={cat} alt="error cat" />
    </div>
  ) : (
    <img className="Error" src="https://http.cat/404" alt="404 not found" />
  );
};

export default DisplayError;
