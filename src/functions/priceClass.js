// Import des icônes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const priceClass = (price) => {
  const priceArray = [];
  if (price) {
    if (price === "Inexpensive") {
      priceArray.push(
        <FontAwesomeIcon
          icon="dollar-sign"
          color="purple"
          key="01"
          className="dollar-sign"
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          color="lightgrey"
          key="02"
          className="dollar-sign"
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          color="lightgrey"
          key="03"
          className="dollar-sign"
        />
      );
    }
  }

  return priceArray;
};

export default priceClass;
