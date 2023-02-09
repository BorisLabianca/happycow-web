// Import des dépendances
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddPicturesModal = ({ token, setAddPicturesModalVisible, placeId }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(photos.length);
  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (!photos || photos.length === 0) {
        return;
      }
      setLoading(true);
      const formData = new FormData();
      Object.keys(photos).forEach((photo) => {
        formData.append("photos", photos[photo]);
      });
      formData.append("placeId", placeId);

      const response = await axios.post(
        "https://site--happycow-backend--67k4ycyfnl9b.code.run/shop/add-pictures",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      //   if (response.data) {
      //     handleUser(response.data);
      //   }
      setLoading(false);
      setAddPicturesModalVisible([false, ""]);
    } catch (error) {
      console.log(error);
      if (error.response?.data.message === "Missing parameters.") {
        setErrorMessage(
          "Please make sure to give a title, rate the shop and write a review."
        );
        setLoading(false);
      }
    }
  };
  return token ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div
        className="add-review-modal-root"
        onClick={() => {
          setAddPicturesModalVisible([false, ""]);
        }}
      >
        <div
          className="add-review-modal"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            className="cancel-button"
            onClick={() => {
              setAddPicturesModalVisible([false, ""]);
            }}
          >
            Cancel
          </div>
          <div
            className="cancel-button"
            onClick={() => {
              setPhotos("");
            }}
          >
            Reset pictures
          </div>
          <div className="inputs">
            <div className="photos-container-add-pictures">
              <label htmlFor="file">
                <FontAwesomeIcon icon="camera" className="photos-icon" />
              </label>
              <input
                type="file"
                id="file"
                multiple={true}
                onChange={(event) => {
                  const photoArray = Object.values(event.target.files);
                  setPhotos(photoArray);
                }}
              />
              {photos &&
                photos.map((photo, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(photo)}
                      key={index}
                      alt={`Shop ${index}`}
                      className="photos-to-upload-add-pictures"
                    />
                  );
                })}
            </div>
            <div className="error-message">{errorMessage}</div>
            <button
              type="button"
              className={
                loading || !photos || photos.length === 0
                  ? "submit-button-disabled"
                  : "submit-button"
              }
              disabled={loading ? true : false}
              onClick={handleSubmit}
            >
              Add picture(s)
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};

export default AddPicturesModal;
