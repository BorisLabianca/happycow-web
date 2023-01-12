import { FaArrowLeft } from "react-icons/fa";

const AddListingNav = ({ handleGoBack, generalInfo, venueDetails }) => {
  return (
    <div className="add-listing-info-nav">
      <div
        className="go-back"
        onClick={() => {
          handleGoBack();
        }}
      >
        <FaArrowLeft />
        <span>Back</span>
      </div>
      <div className="add-listing-all-steps">
        <div className="nav-step">
          <div className={!generalInfo ? "circle active" : "circle"}>1</div>
          <p>General Info</p>
        </div>
        <div className="nav-step">
          <div className={generalInfo ? "circle active" : "circle"}>2</div>
          <p>Venue Details</p>
        </div>
      </div>
    </div>
  );
};

export default AddListingNav;
