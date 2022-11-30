import { Link } from "react-router-dom";

import headerLogo from "../assets/happycow_logo.svg";

const Header = () => {
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
      <div className="user-nav">
        <Link className="header-add-fav-btn">Add Listing</Link>
        <Link to="/user/login" className="header-log-sign-btn">
          Login / Join
        </Link>
      </div>
    </header>
  );
};

export default Header;
