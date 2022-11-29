// Import hooks
import { useState } from "react";

// Import des composants
import LocationCardHome from "../components/LocationCardHome";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopCarrousel = ({ loc, cat }) => {
  const shopArray = [];
  for (let i = 0; i < loc.length; i++) {
    if (
      shopArray.length < 10 &&
      loc[i].thumbnail !== "https://www.happycow.net/img/no-image.jpg" &&
      loc[i].rating > 3
    ) {
      if (loc[i].category === cat) {
        shopArray.push(<LocationCardHome key={loc[i].placeId} loc={loc[i]} />);
      }
    }
  }

  const [startSlide, setStartSlide] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState(shopArray.slice(0, 4));
  const end = startSlide + 4;

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
  // console.log(loc);
  return (
    <div className="items">
      {startSlide === 0 ? null : (
        <FontAwesomeIcon
          icon="circle-left"
          className="arrow-left"
          onClick={prev}
        />
      )}
      {itemsToDisplay}
      {end === shopArray.length ? null : (
        <FontAwesomeIcon
          icon="circle-right"
          className="arrow-right"
          onClick={next}
        />
      )}
    </div>
  );
};

export default ShopCarrousel;
