import React from 'react';
import '../css/TopBar.css';
import logo from '../img/ncNews-logo.png';
import { Link } from '@reach/router';
import { Button } from 'react-bootstrap';

const TopBar = ({ username, loggedIn, logOut }) => {
  return (
    <nav className="TopBar">
      <Link className="Logo" to="/">
        <img src={logo} alt="ncnews logo" />
      </Link>
      {loggedIn && (
        <p className="User">
          <b>{username}</b>
        </p>
      )}
      <Button variant="danger" className="LogOut" onClick={logOut}>
        Logout
      </Button>
    </nav>
  );
};

export default TopBar;
