import { Link } from "react-router-dom";

import headerLogo from "../assets/happycow_logo.svg";

const Header = ({ token, handleToken, user, handleUser }) => {
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
          <button
            className="logout-btn"
            onClick={() => {
              handleToken(null);
              handleUser(null);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="user-nav">
          <Link className="header-add-fav-btn">Add Listing</Link>
          <Link to="/user/login" className="header-log-sign-btn">
            Login / Join
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
