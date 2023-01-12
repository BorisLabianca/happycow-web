// Import des dépendances
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

import ShopTypeCard from "../components/ShopTypeCard";
import AddListingMap from "../components/AddListingMap";
import AddListingNav from "../components/AddListingNav";
import AddListingBottomButtons from "../components/AddListingBottomButtons";

// Import des fonctions
import ratings from "../functions/ratings";
import restaurantTypeTag from "../functions/restaurantTypeTag";

import restaurantTypes from "../restaurantTypes.json";

const AddListing = ({ user, token }) => {
  const [shopType, setShopType] = useState("");
  const [animalOrigin, setAnimalOrigin] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ lng: 2.35, lat: 48.853 });
  const [generalInfo, setGeneralInfo] = useState(false);
  const [venueDetails, setVenueDetails] = useState(false);
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [veganDishesDescription, setVeganDishesDescription] = useState("");
  const [openingDays, setOpeningDays] = useState("");
  const [price, setPrice] = useState("Moderate");
  const [rating, setRating] = useState("");
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitShop = async () => {
    setErrorMessage("");
    if (city && streetAddress && zipcode) {
      setLoading(true);
      try {
        const streetAddressFormated = streetAddress.replace(" ", "+");
        const data = await axios.get(
          `https://api-adresse.data.gouv.fr/search/?q=${streetAddressFormated}&postcode=${zipcode}`
        );
        // console.log(data);
        setCoords({
          lng: data.data.features[0].geometry.coordinates[0],
          lat: data.data.features[0].geometry.coordinates[1],
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage(
        "You must fill out the street address, city and zipcode fields."
      );
    }
  };

  const handleGoBack = () => {
    if (!animalOrigin && !generalInfo) {
      setAnimalOrigin("");
      window.scrollTo(0, 0);
    } else if (!animalOrigin && generalInfo) {
      setGeneralInfo(false);
      window.scrollTo(0, 0);
    }
  };

  const handleClear = () => {
    if (!animalOrigin && !generalInfo) {
      setLoading(true);
      setCoords({ lng: 2.35, lat: 48.853 });
      setBusinessName("");
      setCity("");
      setFacebook("");
      setWebsite("");
      setPhoneNumber("");
      setStreetAddress("");
      setzipcode("");
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } else if (!animalOrigin && generalInfo) {
      setPrice("Moderate");
      setPlaceDescription("");
      setVeganDishesDescription("");
      setOpeningDays("");
      setPictures([]);
      setRating("");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", businessName);
      formData.append(
        "address",
        `${streetAddress}, ${city}, France, ${zipcode}`
      );
      formData.append("lng", coords.lng);
      formData.append("lat", coords.lat);
      formData.append("phone", phoneNumber);
      formData.append("type", shopType.type);
      formData.append("category", shopType.category);
      formData.append("rating", rating);
      formData.append(
        "description",
        `${placeDescription} ${veganDishesDescription} ${openingDays}`
      );
      formData.append("price", price);
      formData.append("website", website);
      formData.append("facebook", facebook);

      Object.keys(pictures).forEach((picture) => {
        formData.append("pictures", pictures[picture]);
      });
      const response = await axios.post(
        // "https://site--happycow-backend--67k4ycyfnl9b.code.run/add",
        "http://localhost:4000/add",
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

  const handleContinue = () => {
    if (!generalInfo) {
      setGeneralInfo(true);
    } else if (generalInfo && !venueDetails) {
      setVenueDetails(true);
    } else if (generalInfo && venueDetails) {
      handleSubmit();
    }
  };

  return !token ? (
    <Navigate to="/user/login" />
  ) : (
    <div className="container">
      {!shopType ? (
        <div className="add-listing-main">
          <h1>Add Listing</h1>
          <div className="type-selection-div">
            {restaurantTypes.map((type) => {
              return (
                <ShopTypeCard
                  key={type.category}
                  type={type}
                  setShopType={setShopType}
                />
              );
            })}
          </div>
        </div>
      ) : animalOrigin === "" ? (
        <div className="serves-flesh-or-fish">
          <div
            className="go-back"
            onClick={() => {
              setShopType("");
            }}
          >
            <FaArrowLeft />
            <span>Back</span>
          </div>
          <h1>Does this place serve animal flesh or fish?</h1>
          <div className="yes-or-no">
            <p
              onClick={() => {
                setAnimalOrigin(true);
              }}
            >
              YES
            </p>
            <p
              onClick={() => {
                setAnimalOrigin(false);
              }}
            >
              NO
            </p>
          </div>
        </div>
      ) : animalOrigin === true ? (
        <div className="sorry">
          <div
            className="go-back"
            onClick={() => {
              setAnimalOrigin("");
            }}
          >
            <FaArrowLeft />
            <span>Back</span>
          </div>
          <h1>Sorry {user.username}, we don't condone this kind of shop.</h1>
          <p>
            You're welcome to go back and add an animal frienly shop or you can
            get back to our main page.
          </p>
          <Link to="/">Home</Link>
        </div>
      ) : animalOrigin === false && !generalInfo ? (
        <div className="add-listing-info">
          <AddListingNav
            handleGoBack={handleGoBack}
            generalInfo={generalInfo}
            venueDetails={venueDetails}
          />
          <div className="add-listing-business-name-div">
            <p>
              Business name<span style={{ color: "red" }}> *</span>
            </p>
            <div className="business-name-input-and-tag">
              <input
                type="text"
                placeholder="Type in the name of the shop"
                value={businessName}
                onChange={(event) => {
                  setBusinessName(event.target.value);
                }}
              />
              <div>{restaurantTypeTag(shopType.category, shopType.type)}</div>
            </div>
          </div>
          <div className="add-listing-phone-number-div">
            <p>
              Phone number<span style={{ color: "red" }}> *</span>
            </p>
            <input
              type="text"
              placeholder="Type in the name of the shop"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-street-div">
            <p>
              Street address<span style={{ color: "red" }}> *</span>
            </p>
            <input
              type="text"
              placeholder="Type in the street address"
              value={streetAddress}
              onChange={(event) => {
                setStreetAddress(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-city-div">
            <p>
              City<span style={{ color: "red" }}> *</span>
            </p>
            <input
              type="text"
              placeholder="Type in the city"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-zipcode-div">
            <p>
              Zipcode<span style={{ color: "red" }}> *</span>
            </p>
            <input
              type="text"
              placeholder="Type in the zipcode"
              value={zipcode}
              onChange={(event) => {
                setzipcode(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-zipcode-div">
            <p>Country</p>
            <input
              type="text"
              placeholder="Type in the zipcode"
              value="France"
              readOnly
            />
          </div>
          <div className="add-listing-set-location-div">
            <div
              className={
                !city || !streetAddress || !zipcode
                  ? "set-location-disabled"
                  : "set-location"
              }
              onClick={handleSubmitShop}
            >
              Set location
            </div>
            <div className="error-message">{errorMessage}</div>
          </div>

          {loading ? (
            <MutatingDots
              height="100"
              width="100"
              color="#7c4ec4"
              secondaryColor="#7c4ec4"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <AddListingMap shopType={shopType} coords={coords} />
          )}
          <div className="add-listing-website-div">
            <p>Website</p>
            <input
              type="text"
              placeholder="Ex: http://www.website.com"
              value={website}
              onChange={(event) => {
                setWebsite(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-facebook-div">
            <p>Facebook Page</p>
            <input
              type="text"
              placeholder="Facebook Page"
              value={facebook}
              onChange={(event) => {
                setFacebook(event.target.value);
              }}
            />
          </div>
          <AddListingBottomButtons
            handleClear={handleClear}
            handleContinue={handleContinue}
          />
        </div>
      ) : animalOrigin === false && generalInfo === true ? (
        <div className="add-listing-info">
          <AddListingNav
            handleGoBack={handleGoBack}
            setAnimalOrigin={setAnimalOrigin}
            generalInfo={generalInfo}
            venueDetails={venueDetails}
          />
          <div className="add-listing-instagram-div">
            <p>
              Briefly describe this place
              <span style={{ color: "red" }}> *</span>
            </p>
            <textarea
              type="text"
              rows="5"
              className="text-area"
              placeholder="e.g. Italian resturant"
              value={placeDescription}
              onChange={(event) => {
                setPlaceDescription(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-instagram-div">
            <p>
              What vegan dishes do they offer?
              <span style={{ color: "red" }}> *</span>
            </p>
            <textarea
              type="text"
              rows="5"
              className="text-area"
              placeholder="e.g. Non-dairy cheese available. Swap in on vegetarian pies to make them vegan."
              value={veganDishesDescription}
              onChange={(event) => {
                setVeganDishesDescription(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-instagram-div">
            <p>
              Price Range
              <span style={{ color: "red" }}> *</span>
            </p>
            <div className="price-range">
              <div
                className={
                  price === "Inexpensive"
                    ? "price-range-type"
                    : "price-range-type-not-selected"
                }
                onClick={() => {
                  setPrice("Inexpensive");
                }}
              >
                Inexpensive
              </div>
              <div
                className={
                  price === "Moderate"
                    ? "price-range-type"
                    : "price-range-type-not-selected"
                }
                onClick={() => {
                  setPrice("Moderate");
                }}
              >
                Moderate
              </div>
              <div
                className={
                  price === "Expensive"
                    ? "price-range-type"
                    : "price-range-type-not-selected"
                }
                onClick={() => {
                  setPrice("Expensive");
                }}
              >
                Expensive
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Based on LOCAL standard. Example for USA, per dish: Inexpensive
              US$1-8, Moderate US$9-15, Expensive US$16+
            </p>
          </div>
          <div className="add-listing-rating-div">
            <p>{ratings(rating ? rating : 0)}</p>
            <select
              name="rating"
              id="rating"
              value={rating}
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
          </div>
          <div className="add-listing-instagram-div">
            <p>
              When are they open?
              <span style={{ color: "red" }}> *</span>
            </p>
            <textarea
              type="text"
              rows="5"
              className="text-area"
              placeholder="e.g. Open Mon 09:00-18:00, 10:00-18:00, Wed-Sat 09:00-18:00."
              value={openingDays}
              onChange={(event) => {
                setOpeningDays(event.target.value);
              }}
            />
          </div>
          <div className="add-listing-instagram-div">
            <p>
              Please add at least 1 picture
              <span style={{ color: "red" }}> *</span>
            </p>
            <div className="pictures-container">
              <label htmlFor="file">
                <FaCamera className="pictures-icon" />
              </label>

              <input
                type="file"
                id="file"
                multiple={true}
                onChange={(event) => {
                  const pictureArray = Object.values(event.target.files);
                  setPictures(pictureArray);
                }}
              />
              {pictures &&
                pictures.map((picture, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(picture)}
                      key={index}
                      alt={`Shop ${index}`}
                      className="pictures-to-upload"
                    />
                  );
                })}
            </div>
          </div>

          <AddListingBottomButtons
            handleClear={handleClear}
            handleContinue={handleContinue}
          />
          {loading && (
            <MutatingDots
              height="100"
              width="100"
              color="#7c4ec4"
              secondaryColor="#7c4ec4"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </div>
      ) : venueDetails ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddListing;
