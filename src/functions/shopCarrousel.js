// Import des composants
import LocationCardHome from "../components/LocationCardHome";

const shopCarrousel = (loc, cat) => {
  const shopArray = [];
  for (let i = 0; i < loc.length; i++) {
    if (
      shopArray.length < 10 &&
      loc[i].thumbnail !== "https://www.happycow.net/img/no-image.jpg"
    ) {
      if (loc[i].category === cat) {
        shopArray.push(<LocationCardHome key={loc[i].placeId} loc={loc[i]} />);
      }
    }
  }
  return shopArray;
};

export default shopCarrousel;
