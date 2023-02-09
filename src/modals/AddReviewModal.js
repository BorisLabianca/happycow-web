// Import des dépendances
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// Import des fonctions
import ratings from "../functions/ratings";

// Import de Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddReviewModal = ({ token, setAddReviewModalVisible, placeId }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (!title || !review || !rating) {
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("review", review);
      formData.append("rating", rating);
      formData.append("pros", pros);
      formData.append("cons", cons);
      Object.keys(photos).forEach((photo) => {
        formData.append("photos", photos[photo]);
      });
      formData.append("placeId", placeId);

      const response = await axios.post(
        "https://site--happycow-backend--67k4ycyfnl9b.code.run/shop/add-review",
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
      setAddReviewModalVisible([false, ""]);
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
  const handleResetDropdown = () => {
    const dropDown = document.getElementById("rating");
    dropDown.selectedIndex = 0;
  };

  console.log(placeId);
  return token ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div
        className="add-review-modal-root"
        onClick={() => {
          setAddReviewModalVisible([false, ""]);
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
              setAddReviewModalVisible([false, ""]);
            }}
          >
            Cancel
          </div>
          <div
            className="cancel-button"
            onClick={() => {
              setTitle("");
              setRating("");
              setReview("");
              setPros("");
              setCons("");
              setPhotos("");
              handleResetDropdown();
            }}
          >
            Reset review
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Title of the review"
              value={title}
              className="text-input"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <p>{ratings(rating ? rating : 0)}</p>
            <select
              name="rating"
              id="rating"
              onChange={(event) => {
                setRating(Number(event.target.value));
              }}
            >
              <option value="">Rate this shop</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={2.5}>2.5</option>
              <option value={3}>3</option>
              <option value={3.5}>3.5</option>
              <option value={4}>4</option>
              <option value={4.5}>4.5</option>
              <option value={5}>5</option>
            </select>
            <textarea
              type="text"
              placeholder="Type your comment here"
              rows="5"
              className="text-area"
              value={review}
              onChange={(event) => {
                setReview(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Type pros here"
              className="text-input"
              value={pros}
              onChange={(event) => {
                setPros(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Type cons here"
              className="text-input"
              value={cons}
              onChange={(event) => {
                setCons(event.target.value);
              }}
            />
            <div className="photos-container">
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
                      className="photos-to-upload"
                    />
                  );
                })}
            </div>
            <div className="error-message">{errorMessage}</div>
            <button
              type="button"
              className={
                loading || !title || !review || !rating
                  ? "submit-button-disabled"
                  : "submit-button"
              }
              disabled={loading ? true : false}
              onClick={handleSubmit}
            >
              Update profile
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};

export default AddReviewModal;
