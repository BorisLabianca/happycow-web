// Import des packages
import { Link } from "react-router-dom";
import { useState } from "react";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des assets
import whiteLogo from "../assets/happycow_logo_white.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-main">
      <div className="login-container">
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
          <div className="login-signup-switch-login">
            <Link to="/user/login" className="switch-to on-login">
              Login
            </Link>
            <Link to="/user/signup" className="switch-to">
              Sign Up
            </Link>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="email-div-login">
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
            <div className="password-div-login">
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
                  className="password-hide-login"
                  onClick={handleVisible}
                />
              ) : (
                <FontAwesomeIcon
                  icon="eye"
                  className="password-reveal-login"
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

export default Login;
