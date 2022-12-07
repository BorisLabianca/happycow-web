// Import des dépendances
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({
  user,
  token,
  profileModalVisible,
  setProfileModalVisible,
}) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/profile/${user._id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data);
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUserInfo();
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/favorites",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFavorites();
  }, [user, token]);

  return token ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <div className="profile-main">
          <div className="avatar-div">
            {!userInfo.avatar ? (
              <img
                src="https://res.cloudinary.com/dbe27rnpk/image/upload/v1670078435/happycow/avatar_filler_yolhht.svg"
                alt="User avatar"
                className="profile-avatar"
              />
            ) : (
              <img
                src={userInfo.avatar}
                alt="User avatar"
                className="profile-avatar"
              />
            )}

            <div
              className="avatar-upload-div"
              onClick={() => {
                setProfileModalVisible(!profileModalVisible);
              }}
            >
              <FontAwesomeIcon icon="camera" className="avatar-upload-icon" />
            </div>
          </div>
          <div className="info-div">
            <div className="only-info">
              <p className="profile-page-username">{userInfo.username}</p>
              <p className="profile-page-email">{userInfo.email}</p>
              <p className="profile-page-location">{userInfo.location}</p>
            </div>
            <FontAwesomeIcon
              icon="pen"
              className="info-edit-button"
              onClick={() => {
                setProfileModalVisible(!profileModalVisible);
              }}
            />
          </div>
          <div className="favorites-div"></div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Profile;
