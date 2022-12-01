import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Images from "./pages/Images";
import AllOffersMap from "./pages/AllOffersMap";

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
  faClock
);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alloffersmap" element={<AllOffersMap />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/shop/:id/images" element={<Images />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
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
