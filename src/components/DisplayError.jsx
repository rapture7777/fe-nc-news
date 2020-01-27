import React from 'react';

const DisplayError = ({ err }) => {
  return err ? <h3>Woops! {err}</h3> : <h3>Woops! Can't find that one...</h3>;
};

export default DisplayError;
