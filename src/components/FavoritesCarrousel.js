// Import hooks
import { useState } from "react";

// Import des composants
import FavoriteCardProfilePage from "./FavoriteCardProfilePage";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoritesCarrousel = ({ favorites, handleDeleteFavorite }) => {
  const shopArray = [];
  for (let i = 0; i < favorites.length; i++) {
    if (shopArray.length < 10) {
      shopArray.push(
        <FavoriteCardProfilePage
          key={favorites[i]._id}
          favorites={favorites[i]}
          handleDeleteFavorite={handleDeleteFavorite}
        />
      );
    }
  }
  const [startSlide, setStartSlide] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(shopArray.slice(0, 3));
  const end = startSlide + 3;

  const prev = () => {
    setStartSlide(startSlide - 1);
    const newArray = [...itemsToDisplay];
    newArray.pop();
    newArray.unshift(shopArray[startSlide - 1]);
    setItemsToDisplay(newArray);
  };

  const next = () => {
    setStartSlide(startSlide + 1);
    const newArray = [...itemsToDisplay];
    newArray.shift();
    newArray.push(shopArray[end]);
    setItemsToDisplay(newArray);
  };
  // console.log(itemsToDisplay);
  return (
    <div className="items">
      {startSlide === 0 ? null : (
        <FontAwesomeIcon
          icon="circle-left"
          className="arrow-left"
          onClick={prev}
        />
      )}
      <div className="favorites-list">{itemsToDisplay}</div>
      {end === shopArray.length || shopArray.length < 4 ? null : (
        <FontAwesomeIcon
          icon="circle-right"
          className="arrow-right"
          onClick={next}
        />
      )}
    </div>
  );
};

export default FavoritesCarrousel;
