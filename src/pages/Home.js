// Import des dépendances
import { useEffect, useState } from "react";

// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
import restaurants from "../restaurants.json";

// Import des composants
import CategoryHome from "../components/CategoryHome";

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
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants}
            cat={0}
            title={"Vegan restaurants"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants}
            cat={2}
            title={"Vegan shops"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants}
            cat={3}
            title={"Les boulangeries"}
          />
          <CategoryHome
            lat={latitude}
            long={longitude}
            loc={restaurants}
            cat={12}
            title={"Les glaciers"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
