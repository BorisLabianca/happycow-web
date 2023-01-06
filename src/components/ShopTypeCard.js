const ShopTypeCard = ({ type, setShopType }) => {
  return (
    <div
      className="shop-card-type-container"
      onClick={() => {
        setShopType(type);
      }}
    >
      <div className="shop-type-icon-container">
        <img src={type.icon} alt={type.type} />{" "}
      </div>
      <p>{type.type}</p>
    </div>
  );
};

export default ShopTypeCard;
