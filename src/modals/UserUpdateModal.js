// Import des dépedances
import { useState } from "react";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserUpdateModal = ({ token, setProfileModalVisible, handleUser }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("location", location);
      formData.append("preferences", preferences);

      const response = await axios.put(
        "http://localhost:4000/user/update",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(response.data);
      if (response.data) {
        handleUser(response.data);
      }
      setLoading(false);
      setProfileModalVisible(false);
    } catch (error) {
      console.log(error);
      if (error.response?.data.message === "Missing informations.") {
        setErrorMessage("Please change at least one piece of information.");
        setLoading(false);
      }
      if (error.response?.data.message === "This username is already used.") {
        setErrorMessage("This username is already used.");
        setLoading(false);
      }
      if (
        error.response?.data.message === "This email address is already used."
      ) {
        setErrorMessage("This email address is already used.");
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="profile-modal-root"
      onClick={() => {
        setProfileModalVisible(false);
      }}
    >
      <div
        className="profile-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className="cancel-button"
          onClick={() => {
            setProfileModalVisible(false);
          }}
        >
          Cancel
        </div>
        <div className="inputs">
          <div className="avatar-update-container">
            <label htmlFor="file">
              <FontAwesomeIcon icon="camera" className="avatar-update-icon" />
            </label>

            <input
              type="file"
              id="file"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
              }}
            />
            {avatar && (
              <img
                src={URL.createObjectURL(avatar)}
                alt="New avatar"
                className="avatar-to-upload"
              />
            )}
          </div>
          <input
            type="text"
            placeholder="New username"
            value={username}
            className="text-input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="New email address"
            value={email}
            className="text-input"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="New location"
            value={location}
            className="text-input"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <select
            name="prefenreces"
            id="preferences"
            onChange={(event) => {
              setPreferences(event.target.value);
            }}
          >
            <option value="">Choose a new preference</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Raw">Raw</option>
            <option value="Mostly Veg">Mostly Veg</option>
            <option value="Non Veg">Non Veg</option>
            <option value="Herbivore">Herbivore</option>
            <option value="Fruitarian">Fruitarian</option>
          </select>
          <div className="error-message">{errorMessage}</div>
          <button
            type="button"
            className={loading ? "submit-button-disabled" : "submit-button"}
            disabled={loading ? true : false}
            onClick={handleSubmit}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
