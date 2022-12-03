// Import des dépendances
import { useEffect, useState } from "react";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <div className="avatar-div">
        {!user.avatar ? (
          <img
            src="https://res.cloudinary.com/dbe27rnpk/image/upload/v1670078435/happycow/avatar_filler_yolhht.svg"
            alt="User avatar"
            className="profile-avatar"
          />
        ) : (
          <img src={user.avatar} alt="User avatar" className="profile-avatar" />
        )}

        <div className="avatar-upload-div">
          <FontAwesomeIcon icon="camera" className="avatar-upload-icon" />
          <input type="file" name="file" id="file" className="avatar-input" />
        </div>
      </div>

      <p>{user.username}</p>
      <p>{user.location}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
