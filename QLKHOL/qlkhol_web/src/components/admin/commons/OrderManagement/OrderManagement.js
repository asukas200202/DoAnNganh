import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./OrderManagement.css"
import OrderAPI from "../../../../api/order";
import OMEdit from "./Actions/OMEdit/OMEdit";

const OrderManagement = () => {
  const searchOptions = [
    { value: "all", label: "tất cả" },
    { value: "0", label: "Chờ xác nhận" },
    { value: "1", label: "Đã thanh toán" }
  ];
  const [orderList, setOrderList] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [statusSelected, setStatusSelected] = useState({ value: "all", label: "tất cả" });


  const [searchData, setSearchData] = useState({
    target: "code",
    value: "",
  });

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = () => {
    OrderAPI.get({}).then((response) => {
      if (response.status === true) {
        console.log(response);
        setOrderList(response.data.data);
      } else {
        setOrderList([]);
      }
    });
  };

  const onHandleEdit = (user) => {
    setOrderDetail(user);
    setIsOpenEdit(true);
  };

  const handleInputSearchChange = (event) => {
    var sData = searchData;
    sData.target = "code";
    sData.value = event.target.value;
    if(event.target.value === "")
        getOrderData()
    setSearchData(sData);
  };

  const onSearch = () => {
    if(searchData.target === "code") {

    }
    OrderAPI.search(searchData.target, searchData.value).then((response) => {
      if (response.status === true) {
        setOrderList(response.data.data);
      } else {
        setOrderList([]);
      }
    });
  };

  const searchClear = () => {
    setSearchData({
      target: "name",
      value: "",
    });
    var inputSearch = document.querySelector(".input-search");
    if (inputSearch) {
      inputSearch.value = "";
    }
  };

  const closeModalEdit = () => {
    // setProductDetail(null);
    setIsOpenEdit(false);
    getOrderData();
    // clear search action
    searchClear();
    setStatusSelected(searchOptions[0])
  };

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const handleSelectChange = (name, event) => {
    var sData = searchData;
    sData.target = name;
    sData.value = event.value;
    setSearchData(sData);
    setStatusSelected(sData)
    onSearch();
  };

  

  return (
    <div>
      <div className="OrderManagement">
        <div className="OrderManagement-nav">
          <div className="OrderManagement-filter">
            <div className="search-bar">
              <div className="select-options">
                <Select
                  options={searchOptions}
                  defaultValue={statusSelected}
                  onChange={(e) => handleSelectChange("status", e)}
                />
              </div>

              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn hàng..."
                className="input-search"
                onChange={handleInputSearchChange}
              />
              <i className="bi bi-search" onClick={onSearch}></i>
            </div>
          </div>
        </div>


        <div className="OrderManagement-content">
          <div className="OM-table">
            <div className="OM-header">
              <div className="O-code">Mã đơn hàng</div>
              <div className="O-email">Email xác nhận</div>
              <div className="O-price">Tổng thanh toán</div>
              <div className="O-status">Trạng thái </div>
              <div className="O-create-at">Ngày tạo đơn </div>
            </div>
            <div className="OM-body">
              {orderList.map((order) => {
                return (
                  <div
                    className="O-item"
                    key={"OM-" + order._id}
                    onClick={() => onHandleEdit(order)}
                  >
                    <div className="O-code">{order.code}</div>
                    <div className="O-email">{order.userId.email}</div>
                    <div className="O-price">{convertToCurrency(order.price)}</div>
                    <div
                      className="O-status"
                      style={{
                        color: order.status === "0" ? "red" : "green",
                      }}
                    >
                        {order.status === "0" ? "Chờ xác nhận" : "Đã thanh toán"}
                    </div>

                    <div className="O-create-at">{order.createdAt}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      

      <div className="OrderManagement-edit-container">
        <OMEdit
          isOpen={isOpenEdit}
          onRequestClose={closeModalEdit}
          data={orderDetail}
        ></OMEdit>
      </div>
    </div>
  )
}

export default OrderManagement