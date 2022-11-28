// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
import restaurants from "../restaurants.json";

// Import fonctions
import shopCarrousel from "../functions/shopCarrousel";

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
            <div className="items">
              {shopCarrousel(restaurants, 0)}
              {/* {restaurants.map((loc) => {
                if (loc.category === 0) {
                  return <LocationCardHome key={loc.placeId} loc={loc} />;
                } else {
                  return null;
                }
              })} */}
            </div>
          </div>
          <div className="category-container">
            <h2 className="category-title">Vegan shops</h2>
            <div className="items">{shopCarrousel(restaurants, 2)}</div>
          </div>
          <div className="category-container">
            <h2 className="category-title">Les boulangeries</h2>
            <div className="items">{shopCarrousel(restaurants, 3)}</div>
          </div>
          <div className="category-container">
            <h2 className="category-title">Les glaciers</h2>
            <div className="items">{shopCarrousel(restaurants, 12)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
