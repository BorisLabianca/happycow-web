// Import des packages
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des assets
import whiteLogo from "../assets/happycow_logo_white.png";

const Login = ({ handleToken, handleUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      if (!email || !password) {
        setErrorMessage(
          "Veuillez renseigner votre adresse e-mail et votre mot de passe."
        );
        return;
      } else {
        const response = await axios.post("http://localhost:4000/user/login", {
          email: email,
          password: password,
        });
        console.log(response.data);
        if (response.data.token) {
          handleToken(response.data.token);
          handleUser(response.data);
          if (location.state?.previousUrl) {
            navigate(location.state.previousUrl);
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data.message === "Unauthorized.") {
        setErrorMessage("Mauvaise combinaison adresse e-mail / mot de passe.");
      }
    }
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
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
