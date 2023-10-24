import React, { useEffect, useContext, useState } from "react";
import "./Payment.css";
import QRCODE from "../../../../assets/qrcode.jpg";
import OrderAPI from "../../../../api/order";
import { DataContext } from "../../../../context/DataContext";

const Payment = () => {
  const { cart, updateCart, removeFromCart, deleteCart } =
    useContext(DataContext);
  const [isConfirmCheckout, setIsConfirmCheckout] = useState(false);
  useEffect(() => {
    console.log(cart);
  });

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const getTotalBill = () => {
    var total = 0;
    cart.map((item) => {
      total += item.price;
    });

    return total;
  };

  const onConfirmPayment = () => {
    var user = JSON.parse(localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS"));
    var totalPrice = getTotalBill();
    var products = [];

    cart.map((item) => {
      products.push(item._id);
    });

    var newOrder = {
      userId: user._id,
      price: totalPrice,
      products: products,
    };

    OrderAPI.create(newOrder).then((response) => {
      if (response.status === true) {
        deleteCart();
        setIsConfirmCheckout(true);
      }
    });
  };

  return (
    <div style={{padding: "20px 0px"}}>
      <div className="Payment">
        <div className="qr-code">
          <img src={QRCODE} />
        </div>
        <div className="payment-container">

          {!isConfirmCheckout ? (
            <div className="payment-list">
              <div className="title">
                <h2>Thanh toán</h2>
              </div>
              <div className="product-list">
                {cart.map((item) => {
                  return (
                    <div className="item">
                      <div className="item-field">
                        <span>Tên khóa học: </span>
                        <span>{item.name}</span>
                      </div>
                      <div className="item-field">
                        <span>Giáo viên: </span>
                        <span>{item.teacherId.fullName}</span>
                      </div>
                      <div className="item-field">
                        <span>Giá: </span>
                        <span className="price">
                          {convertToCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="sub-total">
                <span>Tổng tiền</span>
                <span>{convertToCurrency(getTotalBill())}</span>
              </div>
              <div
                className="confirm-checkout"
                onClick={() => onConfirmPayment()}
              >
                Xác nhận đơn hàng
              </div>
            </div>
          ) : (
            <div className="checkout-success">
              <h3>Xác nhận đơn hàng thành công</h3>
              <p>Vui lòng thanh toán đơn hàng của bạn bằng cách chuyển khoản tới tài khoản trên màn hình để hoàn tất đặt hàng</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Payment;
