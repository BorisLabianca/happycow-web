// Import des dépendances
import { useEffect, useState } from "react";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({ user, profileModalVisible, setProfileModalVisible }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/profile/${user._id}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
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
  }, [user]);

  return loading ? (
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

        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        <p>Location: {userInfo.location}</p>
      </div>
    </div>
  );
};

export default Profile;
