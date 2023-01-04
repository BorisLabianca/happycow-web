import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import headerLogo from "../assets/happycow_logo.svg";

const Header = ({ token, handleToken, user, handleUser }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef();
  const triggerRef = useRef();
  const myProfileRef = useRef();
  const logoutRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        // console.log(dropdownRef.current);
        setVisible(false);
      } else if (myProfileRef.current?.contains(event.target)) {
        setVisible(false);
        navigate("/user/profile");
      } else if (logoutRef.current?.contains(event.target)) {
        setVisible(false);
        handleToken(null);
        handleUser(null);
        navigate("/");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [navigate, handleToken, handleUser]);
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
          <Link to="/add-listing" className="header-add-fav-btn">
            Add Listing
          </Link>
          <div
            ref={triggerRef}
            className="dropdown-access"
            onClick={() => {
              setVisible((visible) => !visible);
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
            <div className="dropdown" ref={dropdownRef}>
              <FontAwesomeIcon icon="angle-down" className="drop-btn" />
              <FontAwesomeIcon
                icon="sort-up"
                className={visible ? "dropdown-content-arrow" : "hidden"}
              />
              <div className={visible ? "dropdown-content" : "hidden"}>
                <span
                  ref={myProfileRef}
                  onClick={() => {
                    setVisible(false);
                    navigate("/user/profile");
                  }}
                >
                  My profile
                </span>
                <span
                  ref={logoutRef}
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
