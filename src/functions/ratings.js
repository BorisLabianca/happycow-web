// // Import de fontawesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const ratings = (rating) => {
//   const starTab = [];
//   for (let i = 0; i < 5; i++) {
//     if (i < rating - 0.5) {
//       starTab.push(<FontAwesomeIcon icon="star" color="#FFDB5A" key={i} />);
//     } else if (i + 0.5 === rating) {
//       starTab.push(
//         <FontAwesomeIcon icon="star-half-stroke" color="#FFDB5A" key={i} />
//       );
//     } else
//       starTab.push(<FontAwesomeIcon icon="star" color="#BBBBBB" key={i} />);
//   }
//   return starTab;
// };
// export default ratings;

import { FaStarHalf, FaStar } from "react-icons/fa";

const ratings = (rating) => {
  const starTab = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating && rating - i > 1) {
      starTab.push(<FaStar color="#FECC01" key={i} />);
    } else if (i < rating && rating - i < 1) {
      starTab.push(
        <div style={{ position: "relative" }} key={i}>
          <FaStarHalf
            color="#FECC01"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <FaStar color="#BBBBBB" />
        </div>
      );
    } else if (i < rating && rating - i === 1) {
      starTab.push(<FaStar color="#FECC01" key={i} />);
    } else {
      starTab.push(<FaStar color="#BBBBBB" key={i} />);
    }
  }
  return <div style={{ display: "flex" }}>{starTab}</div>;
};
export default ratings;
