import React, { useState, useEffect } from "react";
import "./OMEdit.css";
import Modal from "react-modal";
import Select from "react-select";
import OrderAPI from "../../../../../../api/order";
import Loading from "../../../Loading/Loading";
import ProductAPI from "../../../../../../api/product";


const OMEdit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [statusList, setStatusList] = useState([
    { value: "0", label: "Chờ xác nhận" },
    { value: "1", label: "Đã thanh toán" }
  ]);

  const onCloseModal = () => {
    //resetModelData();
    props.onRequestClose();
  };

  useEffect(() => {
    if (props.data !== null) {
      setOrderData(props.data);
    }

  }, [props]);

  const onDelete = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này tiếp tục?"
    );
    if (result) {
      setIsLoading(true);
      OrderAPI.delete(orderData._id).then((response) => {
        if (response.status === true) {
            setIsLoading(false);
            onCloseModal();
        }
      });
    }
  };

  const onUpdate = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn cập nhật dữ liệu mới này?"
    );

    if (result) {
      setIsLoading(true)
      const updateUser = orderData;
      OrderAPI.update(updateUser).then((response) => {
        if (response.status === true) {
          if(updateUser.status === "1") {
            updateUser.products.map(product => {
              var foundProduct = product.students.find(id => id === orderData.userId._id);
              if(!foundProduct) {
                product.students.push(orderData.userId._id);
                ProductAPI.update(product).then((response) => {
                  if (response.status === true) {
                    setIsLoading(false)
                    onCloseModal();
                  }
                });
              }
             
            })
          }
          else {

          }
          setIsLoading(false)
          onCloseModal();
        }
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, event) => {
    const { value } = event;
    setOrderData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };




  return (
    <div className="OMEdit">
      {!props.isOpen ? (
        <></>
      ) : (
        <div>
          <Modal
            isOpen={props.isOpen}
            contentLabel="Example Modal"
            id="OMEdit-modal"
          >
            <div className="OMEdit-close" onClick={() => onCloseModal()}>
              <i className="bi bi-x-lg"></i>
            </div>
            {!orderData ? (
              <></>
            ) : (
              <div className="OMEdit-content">
                <div className="title">
                  <h4>Thông tin đơn hàng</h4>
                </div>

                <div className="create-container">
                  <div className="create-form">
                    <div className="field-input p-col-2">
                      <p>Họ tên</p>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={orderData.userId.fullName}
                        disabled
                      />
                    </div>

                    <div className="field-input p-col-2">
                      <p>Email</p>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={orderData.userId.email}
                        disabled
                      />
                    </div>
  
                    <div className="field-input p-col-3">
                      <p>Mã đơn hàng</p>
                      <input
                        type="text"
                        name="code"
                        onChange={handleInputChange}
                        value={orderData.code}
                        disabled
                      />
                    </div>
  
                    <div className="field-input p-col-3">
                      <p>Tổng thanh toán</p>
                      <input
                        type="text"
                        name="price"
                        onChange={handleInputChange}
                        value={convertToCurrency(orderData.price)}
                        disabled
                      />
                    </div>
  
                    <div className="field-input p-col-3">
                      <p>Trạng thái đơn hàng</p>
                      <Select
                        options={statusList}
                        name="categoryId"
                        defaultValue={statusList.find(
                          (status) => status.value === props.data.status
                        )}
                        onChange={(e) => handleSelectChange("status", e)}
                      />
                    </div>
  
                    <div className="field-input p-col-1">
                      <p style={{fontWeight: "bold"}}>Danh sách sản phẩm</p> 
                    </div>
  
                    {orderData.products.map((product) => {
                      return (
                        <div
                          className="product-item"  
                          style={{
                            display: "flex",
                            width: "100%",
                            gap: "10px",
                            paddingRight: "10px",
                          }}
                        >
                          <div className="field-input p-col-auto">
                            <p>Tên khóa học</p>
                            <input value={product.name} disabled/>
                          </div>
                          <div className="field-input p-col-4">
                            <p>Giáo viên</p>
                            <input value={product.teacherId.fullName} disabled/>
                          </div>
  
                          <div className="field-input p-col-4">
                            <p>Giá</p>
                            <input value={convertToCurrency(product.price)} disabled/>
                          </div>
                        </div>
                      );
                    })}

                    <div className="save-button">
                      <button onClick={onDelete}>
                        {isLoading ? (
                          <img
                            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                            style={{ width: "20px" }}
                          />
                        ) : (
                          "Xóa"
                        )}
                      </button>
                      <button onClick={onUpdate}>Cập nhật</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
          <Loading isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default OMEdit;
