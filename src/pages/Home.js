// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
import restaurants from "../restaurants.json";

// Import des composants
import ShopCarrousel from "../components/ShopCarrousel";

const Home = () => {
  // console.log(restaurants.length);

  // const restaurantsArray = [];
  // for (let i = 0; i < restaurants.length; i++) {
  //   if (restaurantsArray.length < 10) {
  //     if (restaurants[i].category === 0) {
  //       restaurantsArray.push(
  //         <LocationCardHome key={restaurants[i].placeId} loc={restaurants[i]} />
  //       );
  //     }
  //   }
  // }

  // const veganShopsArray = [];
  // for (let i = 0; i < restaurants.length; i++) {
  //   if (veganShopsArray.length < 10) {
  //     if (restaurants[i].category === 2) {
  //       veganShopsArray.push(
  //         <LocationCardHome key={restaurants[i].placeId} loc={restaurants[i]} />
  //       );
  //     }
  //   }
  // }

  return (
    <div>
      <div className="banner-div">
        <img src={banner} alt="Vegan burger in a plate." className="banner" />
      </div>
      <div className="homepage-main">
        <div className="container">
          <div className="category-container">
            <h2 className="category-title">Vegan restaurants</h2>
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
