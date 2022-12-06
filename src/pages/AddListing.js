// Import des dépendances
import { Navigate } from "react-router-dom";

const AddListing = ({ user, token }) => {
  return !token ? (
    <Navigate to="/user/login" />
  ) : (
    <div className="container">
      <div className="add-listing-main">Add listing</div>
    </div>
  );
};

export default AddListing;
