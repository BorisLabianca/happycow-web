import { Link } from "react-router-dom";
import { useState } from "react";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import headerLogo from "../assets/happycow_logo.svg";

const Header = ({ token, handleToken, user, handleUser }) => {
  const [visible, setVisible] = useState(false);
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" className="home-btn">
          <img
            src={headerLogo}
            alt="Logo of HappyCow"
            className="top-left-logo"
          />
        </Link>
      </div>
      {token ? (
        <div className="logout">
          <Link className="header-add-fav-btn">Add Listing</Link>
          <div
            className="dropdown-access"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {!user.avatar ? (
              <img
                src="https://res.cloudinary.com/dbe27rnpk/image/upload/v1670078435/happycow/avatar_filler_yolhht.svg"
                alt="User avatar"
                className="header-avatar"
              />
            ) : (
              <img
                src={user.avatar}
                alt="User avatar"
                className="header-avatar"
              />
            )}
            <span className="header-username">{user.username}</span>
            <div className="dropdown">
              <FontAwesomeIcon icon="angle-down" className="drop-btn" />
              <FontAwesomeIcon
                icon="sort-up"
                className={visible ? "dropdown-content-arrow" : "hidden"}
              />
              <div className={visible ? "dropdown-content" : "hidden"}>
                <Link
                  to="/user/profile"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  My profile
                </Link>
                <span
                  onClick={() => {
                    handleToken(null);
                    handleUser(null);
                    setVisible(false);
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-nav">
          <Link
            to={token ? "/add-listing" : "/user/login"}
            className="header-add-fav-btn"
          >
            Add Listing
          </Link>
          <Link to="/user/login" className="header-log-sign-btn">
            Login / Join
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
