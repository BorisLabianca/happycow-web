import { FaEraser } from "react-icons/fa";

const AddListingBottomButtons = ({ handleClear, handleContinue }) => {
  return (
    <div className="validate-or-clear">
      <div className="clear-form" onClick={handleClear}>
        <FaEraser />
        <p>Reset Form</p>
      </div>
      <div className="validate" onClick={handleContinue}>
        Continue
      </div>
    </div>
  );
};

export default AddListingBottomButtons;
