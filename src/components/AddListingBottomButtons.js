import { FaEraser } from "react-icons/fa";

const AddListingBottomButtons = ({
  handleClear,
  handleContinue,
  businessName,
  phoneNumber,
  streetAddress,
  zipcode,
  city,
  coordsSet,
  placeDescription,
  veganDishesDescription,
  openingDays,
  price,
  rating,
  pictures,
  generalInfo,
  loading,
  venueDetails,
}) => {
  // console.log(businessName);
  // console.log(phoneNumber);
  // console.log(streetAddress);
  // console.log(city);
  // console.log(zipcode);
  // console.log(coordsSet);
  // console.log(generalInfo);
  // console.log(pictures);

  const handleClass = () => {
    if (!generalInfo) {
      if (
        !businessName ||
        !phoneNumber ||
        !streetAddress ||
        !zipcode ||
        !city ||
        !coordsSet
      ) {
        return "validate-disabled";
      } else if (
        businessName &&
        phoneNumber &&
        streetAddress &&
        zipcode &&
        city &&
        coordsSet === true
      ) {
        return "validate";
      }
    } else if (generalInfo && !venueDetails) {
      if (
        !placeDescription ||
        !veganDishesDescription ||
        !openingDays ||
        !price ||
        !rating ||
        pictures.length < 1 ||
        loading
      ) {
        return "validate-disabled";
      } else {
        return "validate";
      }
    } else if (generalInfo && venueDetails) {
      return "validate";
    }
  };
  return (
    <div className="validate-or-clear">
      <div className="clear-form" onClick={handleClear}>
        <FaEraser />
        <p>Reset Form</p>
      </div>
      <div className={handleClass()} onClick={handleContinue}>
        Continue
      </div>
    </div>
  );
};

export default AddListingBottomButtons;
