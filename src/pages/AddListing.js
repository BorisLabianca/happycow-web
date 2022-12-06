// Import des dépendances
import { Navigate } from "react-router-dom";

const AddListing = ({ user, token }) => {
  return !token ? <Navigate to="/user/login" /> : <div>Add listing</div>;
};

export default AddListing;
