// Import des packages
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des assets
import whiteLogo from "../assets/happycow_logo_white.png";

const Signup = (handleToken) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleVisible = () => {
    setVisible(!visible);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="signup-main">
      <div className="signup-container">
        <div className="left-part">
          <div className="logo-slogan">
            <img
              src={whiteLogo}
              alt="White logo"
              className="signup-login-logo"
            />
            <p className="slogan">
              Join the largest vegan and vegetarian community in the world.
            </p>
          </div>
        </div>
        <div className="right-part">
          <div className="login-signup-switch-signup">
            <Link to="/user/login" className="switch-to">
              Login
            </Link>
            <Link to="/user/signup" className="switch-to on-signup">
              Sign Up
            </Link>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="email-div-signup">
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="username-div-signup">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="password-div-signup">
              <span>Password</span>
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {visible ? (
                <FontAwesomeIcon
                  icon="eye-slash"
                  className="password-hide-signup"
                  onClick={handleVisible}
                />
              ) : (
                <FontAwesomeIcon
                  icon="eye"
                  className="password-reveal-signup"
                  onClick={handleVisible}
                />
              )}
            </div>
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
