import React from 'react';
import '../css/TopBar.css';
import logo from '../img/ncNews-logo.png';
import { Link } from '@reach/router';

const TopBar = ({ username, loggedIn }) => {
  return (
    <nav className="TopBar">
      <Link className="Logo" to="/">
        <img src={logo} alt="ncnews logo" />
      </Link>
      {loggedIn && <p className="User">{username}</p>}
    </nav>
  );
};

export default TopBar;
