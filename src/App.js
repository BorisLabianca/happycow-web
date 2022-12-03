import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import des pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Images from "./pages/Images";
import AllOffersMap from "./pages/AllOffersMap";
import Profile from "./pages/Profile";

// Import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import de Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faStarHalfStroke,
  faHeart,
  faCircleRight,
  faCircleLeft,
  faLocationDot,
  faPhone,
  faLink,
  faCamera,
  faDollarSign,
  faClock,
  faEye,
  faEyeSlash,
  faAngleDown,
  faChevronDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faStar,
  faStarHalfStroke,
  faHeart,
  faCircleRight,
  faCircleLeft,
  faLocationDot,
  faPhone,
  faLink,
  faCamera,
  faDollarSign,
  faClock,
  faEye,
  faEyeSlash,
  faAngleDown,
  faChevronDown,
  faSortUp
);

function App() {
  const getUser = () => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      return user;
    } else {
      return null;
    }
  };
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState(getUser || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const handleUser = (user) => {
    if (user) {
      setUser(user);
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } else {
      setUser(null);
      Cookies.remove("user");
    }
  };

  return (
    <Router>
      <Header
        handleToken={handleToken}
        token={token}
        handleUser={handleUser}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alloffersmap" element={<AllOffersMap />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/shop/:id/images" element={<Images />} />
        <Route path="user/profile" element={<Profile user={user} />} />
        <Route
          path="/user/login"
          element={<Login handleToken={handleToken} handleUser={handleUser} />}
        />
        <Route
          path="/user/signup"
          element={<Signup handleToken={handleToken} handleUser={handleUser} />}
        />
      </Routes>
      <Footer
        tech={"React"}
        techSite={"https://reactjs.org/"}
        place={"Le Reacteur"}
        placeSite={"https://www.lereacteur.io/"}
        author={"Boris"}
        linkedin={"https://www.linkedin.com/in/boris-labianca-01a52871/"}
      />
    </Router>
  );
}

export default App;
