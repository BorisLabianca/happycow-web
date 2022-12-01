// Import des dépendances
import { Link } from "react-router-dom";

// Import des composants
import ShopCarrousel from "./ShopCarrousel";

const CategoryHome = ({ lat, long, loc, cat, title }) => {
  // console.log(loc);
  return (
    <div className="category-container">
      <h2 className="category-title">{title}</h2>
      <Link
        to="/alloffersmap"
        state={{
          lat: lat,
          long: long,
        }}
      >
        View all
      </Link>
      <ShopCarrousel loc={loc} cat={cat} />
    </div>
  );
};

export default CategoryHome;
