import ratings from "../functions/ratings";

const ReviewCard = ({ review }) => {
  return (
    <div
      style={{
        height: "300px",
        width: "50%",
        borderStyle: "solid",
        borderColor: "lightgray",
        borderWidth: "1px",
        marginTop: "35px",
        boxShadow: "1px 1px 5px gray",
        padding: "15px",
      }}
    >
      <img
        src={review.owner[0].avatar.secure_url}
        alt=""
        style={{ height: "80px", width: "80px", borderRadius: "50%" }}
      />
      <p>{review.owner[0].username}</p>
      <p>{review.owner[0].preferences}</p>
      <h3>{review.title}</h3>
      <p>{ratings(review.rating)}</p>
      <p>{review.review}</p>
      <p>Pros : {review.pros}</p>
      <p>Cons : {review.cons}</p>
      <div>
        {review.photos.map((photo) => {
          return (
            <img
              src={photo}
              alt=""
              style={{
                height: "80px",
                width: "80px",
                marginRight: "10px",
              }}
              key={photo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
