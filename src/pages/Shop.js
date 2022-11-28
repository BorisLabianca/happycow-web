import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const { shop } = location.state;
  console.log(shop);
  return <div>Single shop info</div>;
};

export default Shop;
