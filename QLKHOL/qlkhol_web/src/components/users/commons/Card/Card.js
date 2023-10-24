import { useEffect } from "react";
import "./Card.css";
function Card(props) {
  const product = props.data;

  useEffect(() => {}, []);

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  return (
    <div className="Card">
      {product ? (
        <div className="card-container">
          <div className="card-image">
            <img src={product.image} />
          </div>
          <div className="card-info">
            <div className="category">{product.categoryId.name}</div>
            <div className="name">{product.name}</div>
            <div className="short-desc text-ellipsis">
              <p>{product.shortDesc}</p>
            </div>
            <div className="teacher">{product.teacherId ? product.teacherId.fullName : ""}</div>
            <div className="price">{convertToCurrency(product.price)}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Card;
