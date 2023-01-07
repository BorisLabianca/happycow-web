import { MutatingDots } from "react-loader-spinner";

// Import des assets
import banner from "../assets/bg_home_large_monday.webp";
// import restaurants from "../restaurants.json";

// Import des composants
import CategoryHome from "../components/CategoryHome";
import SearchBar from "../components/SearchBar";

const Home = ({
  loading,
  latitude,
  longitude,
  restaurants,
  suggestions,
  text,
  onChangeHandler,
  onSuggestHandler,
  setSuggestions,
  setText,
  params,
  setParams,
}) => {
  return loading ? (
    <div className="loader-div">
      <MutatingDots
        height="100"
        width="100"
        color="#7c4ec4"
        secondaryColor="#7c4ec4"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <div>
      <div className="banner-div">
        <img src={banner} alt="Vegan burger in a plate." className="banner" />
        <div className="search-bar">
          <SearchBar
            text={text}
            setText={setText}
            onChangeHandler={onChangeHandler}
            suggestions={suggestions}
            onSuggestHandler={onSuggestHandler}
            setSuggestions={setSuggestions}
            params={params}
            setParams={setParams}
          />
        </div>
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
