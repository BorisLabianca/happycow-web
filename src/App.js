import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";

// Import des composants
import Header from "./components/Header";

// Import de Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faStarHalfStroke,
  faHeart,
  faCircleRight,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faStarHalfStroke, faHeart, faCircleRight, faCircleLeft);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
