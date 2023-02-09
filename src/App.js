import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Import des pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Images from "./pages/Images";
import AllOffersMap from "./pages/AllOffersMap";
import Profile from "./pages/Profile";
import AddListing from "./pages/AddListing";
import Favorites from "./pages/Favorites";

// Import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserUpdateModal from "./modals/UserUpdateModal";
import AddReviewModal from "./modals/AddReviewModal";
import AddPicturesModal from "./modals/AddPicturesModal";
import ScroolToTop from "./components/ScrollToTop";

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
  faChevronRight,
  faArrowDownZA,
  faArrowUpAZ,
  faArrowDownLong,
  faPen,
  faBookmark,
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
  faSortUp,
  faChevronRight,
  faArrowDownZA,
  faArrowUpAZ,
  faArrowDownLong,
  faPen,
  faBookmark
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
  // console.log(user);

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
  const [loading, setLoading] = useState(true);
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [addReviewModalVisible, setAddReviewModalVisible] = useState([
    false,
    "",
  ]);
  const [addPicturesModalVisible, setAddPicturesModalVisible] = useState([
    false,
    "",
  ]);

  useEffect(() => {
    const fetchLocation = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem("latitude", Number(position.coords.latitude));
        localStorage.setItem("longitude", Number(position.coords.longitude));
        // setLatitude(Number(position.coords.latitude));
        // setLongitude(Number(position.coords.longitude));
        // console.log(position);
      });
    };
    fetchLocation();

    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://site--happycow-backend--67k4ycyfnl9b.code.run/allshops"
        );
        console.log(response.data);
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShops();
  }, []);

  // Gestion de la barre de recherche
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = restaurants.shops.filter((shop) => {
        const regex = new RegExp(`${text}`, "gi");
        return shop.name.match(regex);
      });
    }
    setSuggestions(matches);
    // console.log(matches);
    setText(text);
  };
  const [params, setParams] = useState({
    category: [],
    sort: null,
    name: "",
    limit: 81,
    skip: 0,
  });

  // State pour gérer l'envoi de l'id du magasin
  const [placeId, setPlaceId] = useState("");

  return (
    <div className="app">
      <Router>
        <ScroolToTop />
        <Header
          handleToken={handleToken}
          token={token}
          handleUser={handleUser}
          user={user}
          setParams={setParams}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loading={loading}
                latitude={localStorage.getItem("latitude")}
                longitude={localStorage.getItem("longitude")}
                restaurants={restaurants}
                text={text}
                setText={setText}
                suggestions={suggestions}
                onChangeHandler={onChangeHandler}
                setSuggestions={setSuggestions}
                params={params}
                setParams={setParams}
              />
            }
          />
          <Route
            path="/alloffersmap"
            element={
              <AllOffersMap
                latitude={localStorage.getItem("latitude")}
                longitude={localStorage.getItem("longitude")}
                text={text}
                setText={setText}
                suggestions={suggestions}
                onChangeHandler={onChangeHandler}
                setSuggestions={setSuggestions}
                params={params}
                setParams={setParams}
              />
            }
          />
          <Route
            path="/shop/:id"
            element={
              <Shop
                user={user}
                token={token}
                handleUser={handleUser}
                setAddReviewModalVisible={setAddReviewModalVisible}
                setAddPicturesModalVisible={setAddPicturesModalVisible}
                setPlaceId={setPlaceId}
              />
            }
          />
          <Route path="/shop/:id/images" element={<Images />} />
          <Route
            path="user/profile"
            element={
              <Profile
                user={user}
                handleUser={handleUser}
                token={token}
                profileModalVisible={profileModalVisible}
                setProfileModalVisible={setProfileModalVisible}
              />
            }
          />
          <Route
            path="/user/favorites"
            element={
              <Favorites
                token={token}
                latitude={localStorage.getItem("latitude")}
                longitude={localStorage.getItem("longitude")}
              />
            }
          />
          <Route
            path="/add-listing"
            element={<AddListing user={user} token={token} />}
          />
          <Route
            path="/user/login"
            element={
              <Login handleToken={handleToken} handleUser={handleUser} />
            }
          />
          <Route
            path="/user/signup"
            element={
              <Signup handleToken={handleToken} handleUser={handleUser} />
            }
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

        {profileModalVisible && (
          <UserUpdateModal
            setProfileModalVisible={setProfileModalVisible}
            token={token}
            handleUser={handleUser}
          />
        )}
        {addReviewModalVisible[0] && (
          <AddReviewModal
            token={token}
            setAddReviewModalVisible={setAddReviewModalVisible}
            placeId={placeId}
          />
        )}
        {addPicturesModalVisible[0] && (
          <AddPicturesModal
            token={token}
            setAddPicturesModalVisible={setAddPicturesModalVisible}
            placeId={placeId}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
