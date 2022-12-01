import { useLocation, Link } from "react-router-dom";

import ratings from "../functions/ratings";

const Images = () => {
  const location = useLocation();
  const { store } = location.state;
  return (
    <div className="container">
      <div className="store-info">
        <h1>
          {store.pictures.length} Photos of{" "}
          <Link to={`/shop/${store._id}`} state={{ shop: store }}>
            {store.name}
          </Link>
        </h1>
        <div className="rating">{ratings(store.rating)}</div>
      </div>
      <div className="store-images-thumbnail">
        {store.pictures.map((picture, index) => {
          return (
            <img
              src={picture}
              alt="SinglePic"
              key={index}
              className={"vignette"}
              onError={(event) => {
                event.target.style.display = "none";
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Images;
