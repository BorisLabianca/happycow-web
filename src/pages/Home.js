// Import des dépendances
import { useEffect, useState } from "react";

// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
// import restaurants from "../restaurants.json";

// Import des composants
import CategoryHome from "../components/CategoryHome";

const Home = ({ loading, latitude, longitude, restaurants }) => {
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
