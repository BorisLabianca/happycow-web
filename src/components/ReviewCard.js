// Import des fonctions
import handleStyle from "../functions/handleStyle";
import ratings from "../functions/ratings";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card-main">
      <div className="review-card-header">
        <img
          className="review-card-user-avatar"
          src={
            review.owner[0].avatar?.secure_url
              ? review.owner[0].avatar.secure_url
              : "https://res.cloudinary.com/dbe27rnpk/image/upload/v1670078435/happycow/avatar_filler_yolhht.svg"
          }
          alt=""
        />
        <div className="review-card-user-info">
          <p className="review-card-username">{review.owner[0].username}</p>
          <p
            className="review-card-user-preference"
            style={handleStyle(review.owner[0].preferences)}
          >
            {review.owner[0].preferences}
          </p>
        </div>
      </div>
      <div className="review-card-review-content">
        <div className="review-card-rating-date-div">
          <div className="review-card-rating">{ratings(review.rating)}</div>
          <div className="review-card-date">{review.date}</div>
        </div>

        <h3>{review.title}</h3>
        <p>{review.review}</p>
        {review.pros && (
          <p className="pros-cons">
            <span>Pros : </span>
            {review.pros}
          </p>
        )}
        {review.cons && (
          <p className="pros-cons">
            <span>Cons : </span>
            {review.cons}
          </p>
        )}
        <div className="review-card-shop-photo-container">
          {review.photos.map((photo) => {
            return (
              <img
                className="review-card-shop-photo"
                src={photo}
                alt=""
                key={photo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
