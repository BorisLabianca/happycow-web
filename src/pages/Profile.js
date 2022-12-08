// Import des dépendances
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

// Import des composants
import FavoritesCarrousel from "../components/FavoritesCarrousel";

// Import des fonctions
import handleStyle from "../functions/handleStyle";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({
  user,
  handleUser,
  token,
  profileModalVisible,
  setProfileModalVisible,
}) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [favorites, setFavorites] = useState("");

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
        console.log(response.data);
        const favorites = await axios.get(
          "http://localhost:4000/user/favorites",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setUserInfo(response.data);
        setFavorites(favorites.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, [user, token, handleUser]);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleDeleteFavorite = async (placeId, userId) => {
    setLoading(true);
    const response = await axios.delete(
      "http://localhost:4000/user/delete-favorite",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          placeId: placeId,
          userId: userId,
        },
      }
    );
    handleUser(response.data);
    setLoading(false);
    refreshPage();
  };
  // console.log(favorites);
  return token ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <div className="profile-main">
          <div className="personal-info-div">
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
                <p
                  className="profile-page-preferences"
                  style={handleStyle(userInfo.preferences)}
                >
                  {userInfo.preferences}
                </p>
              </div>
              <FontAwesomeIcon
                icon="pen"
                className="info-edit-button"
                onClick={() => {
                  setProfileModalVisible(!profileModalVisible);
                }}
              />
            </div>
          </div>
          <div className="separation-div"></div>
          <div className="favorites-div">
            <div className="favorites-div-nav">
              <div className="favorite-div-nav-title">
                <FontAwesomeIcon
                  icon="bookmark"
                  className="favorites-div-nav-title-icon"
                />
                {favorites && <span>{favorites.length}</span>}
                <h2>Favorites</h2>
              </div>

              <Link to="/user/favorites">View All</Link>
            </div>
            <div>
              <FavoritesCarrousel
                favorites={favorites}
                handleDeleteFavorite={handleDeleteFavorite}
              />
              {/* {favorites.map((favorite) => {
                return (
                  <FavoriteCardProfilePage
                    key={favorite._id}
                    favorite={favorite}
                  />
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Profile;
