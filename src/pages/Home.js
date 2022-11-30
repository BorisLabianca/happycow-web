import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
import restaurants from "../restaurants.json";

// Import des composants
import ShopCarrousel from "../components/ShopCarrousel";

const Home = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(Number(position.coords.latitude));
        setLongitude(Number(position.coords.longitude));
      });
    };
    fetchLocation();
  }, []);

  return (
    <div>
      <div className="banner-div">
        <img src={banner} alt="Vegan burger in a plate." className="banner" />
      </div>
      <div className="homepage-main">
        <div className="container">
          <div className="category-container">
            <h2 className="category-title">Vegan restaurants</h2>
            <Link
              to="/alloffersmap"
              state={{
                lat: latitude,
                long: longitude,
                restaurants: restaurants,
              }}
            >
              View all
            </Link>
            <ShopCarrousel loc={restaurants} cat={0} />
          </div>
          <div className="category-container">
            <h2 className="category-title">Vegan shops</h2>
            <ShopCarrousel loc={restaurants} cat={2} />
          </div>
          <div className="category-container">
            <h2 className="category-title">Les boulangeries</h2>
            <ShopCarrousel loc={restaurants} cat={3} />
          </div>
          <div className="category-container">
            <h2 className="category-title">Les glaciers</h2>
            <ShopCarrousel loc={restaurants} cat={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
