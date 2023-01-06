// Import des dépendances
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

import ShopTypeCard from "../components/ShopTypeCard";
import AddListingMap from "../components/AddListingMap";

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
  const [coords, setCoords] = useState([2.35, 48.853]);
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
        setCoords(data.data.features[0].geometry.coordinates);
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
      ) : (
        animalOrigin === false && (
          <div className="add-listing-info">
            <div
              className="go-back"
              onClick={() => {
                setAnimalOrigin("");
              }}
            >
              <FaArrowLeft />
              <span>Back</span>
            </div>
            <div className="add-listing-business-name-div">
              <p>Business name</p>
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
              <p>Phone number</p>
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
              <p>Street address</p>
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
              <p>City</p>
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
              <p>Zipcode</p>
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
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <AddListingMap shopType={shopType} coords={coords} />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default AddListing;
