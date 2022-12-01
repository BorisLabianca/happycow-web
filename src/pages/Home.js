// Import des dépendances
import { useEffect, useState } from "react";
import axios from "axios";

// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
// import restaurants from "../restaurants.json";

// Import des composants
import CategoryHome from "../components/CategoryHome";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(Number(position.coords.latitude));
        setLongitude(Number(position.coords.longitude));
        // console.log(position);
      });
    };
    fetchLocation();

    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allshops");
        // console.log(response.data.shops);
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchShops();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="banner-div">
        <img src={banner} alt="Vegan burger in a plate." className="banner" />
      </div>
      <div className="homepage-main">
        <div className="container">
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants.shops}
            cat={0}
            title={"Vegan restaurants"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants.shops}
            cat={2}
            title={"Vegan shops"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants.shops}
            cat={3}
            title={"Les boulangeries"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants.shops}
            cat={12}
            title={"Les glaciers"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
