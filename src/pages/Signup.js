// Import des packages
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import des assets
import whiteLogo from "../assets/happycow_logo_white.png";

const Signup = ({ handleToken, handleUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [livingArea, setLivingArea] = useState("");
  const [preferences, setPreferences] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupConfirmation, setSignupConfirmation] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      if (!email || !username || !livingArea || !preferences || !password) {
        setErrorMessage("Veuillez remplir tous les champs.");
        return;
      } else if (password.length < 8) {
        setErrorMessage(
          "Le mot de passe doit comprendre au moins 8 caractères."
        );
        return;
      } else if (passwordConfirmation !== password) {
        setErrorMessage("Vos deux mots de passe doivent être identiques.");
        return;
      } else {
        setLoading(true);
        const response = await axios.post(
          "https://site--happycow-backend--67k4ycyfnl9b.code.run/user/signup",
          {
            email: email,
            username: username,
            location: livingArea,
            preferences: preferences,
            password: password,
          }
        );
        // console.log(response.data);
        if (response.data.token) {
          handleToken(response.data.token);
          handleUser(response.data);
          setSignupConfirmation(true);
          // if (location.state?.previousUrl) {
          //   navigate(location.state.previousUrl);
          // } else {
          //   navigate("/");
          // }
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data.message === "Missing parameters.") {
        setErrorMessage("Veuillez remplir tous les champs.");
      }
      if (
        error.response?.data.message ===
        "The password must be at least 8 characters long."
      ) {
        setErrorMessage(
          "Le mot de passe doit comprendre au moins 8 caractères."
        );
      }
      if (
        error.response?.data.message === "This email address is already used."
      ) {
        setErrorMessage("Cette adresse e-mail est déjà utilisée.");
      }
      if (error.response?.data.message === "This username is already used.") {
        setErrorMessage("Ce nom d'utilisateur est déjà utilisé.");
      }
      setLoading(false);
    }
  };

  const handleReturn = () => {
    if (location.state?.previousUrl) {
      setSignupConfirmation(false);
      navigate(location.state.previousUrl);
    } else {
      setSignupConfirmation(false);
      navigate("/");
    }
  };

  return loading ? (
    <div className="loader-div">
      <MutatingDots
        height="100"
        width="100"
        color="#7c4ec4"
        secondaryColor="#7c4ec4"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : signupConfirmation ? (
    <div className="signup-confirmation-page">
      <h1>Your account has been created.</h1>
      <div onClick={handleReturn} className="return-btn">
        Return
      </div>
    </div>
  ) : (
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
            <div className="location-div-signup">
              <span>Location</span>
              <input
                type="text"
                placeholder="Location"
                value={livingArea}
                onChange={(event) => {
                  setLivingArea(event.target.value);
                }}
              />
            </div>
            <div className="preferences-div-signup">
              <label htmlFor="preferences">Preferences</label>
              <select
                name="preferences"
                id="preferences"
                onChange={(event) => {
                  setPreferences(event.target.value);
                }}
              >
                <option value="">Choose a preference</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Raw">Raw</option>
                <option value="Mostly Veg">Mostly Veg</option>
                <option value="Non Veg">Non Veg</option>
                <option value="Herbivore">Herbivore</option>
                <option value="Fruitarian">Fruitarian</option>
              </select>
            </div>
            <div className="password-div-signup">
              <span>Password</span>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {passwordVisible ? (
                <FontAwesomeIcon
                  icon="eye-slash"
                  className="password-hide-signup"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon="eye"
                  className="password-reveal-signup"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              )}
            </div>
            <div className="password-div-signup">
              <span>Confirm password</span>
              <input
                type={passwordConfirmationVisible ? "text" : "password"}
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
              />
              {passwordConfirmationVisible ? (
                <FontAwesomeIcon
                  icon="eye-slash"
                  className="password-hide-signup"
                  onClick={() => {
                    setPasswordConfirmationVisible(
                      !passwordConfirmationVisible
                    );
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon="eye"
                  className="password-reveal-signup"
                  onClick={() => {
                    setPasswordConfirmationVisible(
                      !passwordConfirmationVisible
                    );
                  }}
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

export default Signup;
