import { Link } from "react-router-dom";

import whiteLogo from "../assets/happycow_logo_white.png";

const Signup = () => {
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
          <div className="login-signup-switch">
            <Link className="switch-to">Login</Link>
            <Link className="switch-to">Sign Up</Link>
          </div>
          <form className="signup-form">
            <span>Email</span>
            <input type="email" placeholder="Email"></input>
            <span>Username</span>
            <input type="text" placeholder="Username" />
            <span>Password</span>
            <input type="password" placeholder="Password" />
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
