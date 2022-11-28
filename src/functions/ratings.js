// Import de fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ratings = (rating) => {
  const starTab = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating - 0.5) {
      starTab.push(<FontAwesomeIcon icon="star" color="#FFDB5A" key={i} />);
    } else if (i + 0.5 === rating) {
      starTab.push(
        <FontAwesomeIcon icon="star-half-stroke" color="#FFDB5A" key={i} />
      );
    } else
      starTab.push(<FontAwesomeIcon icon="star" color="#BBBBBB" key={i} />);
  }
  return starTab;
};
export default ratings;
