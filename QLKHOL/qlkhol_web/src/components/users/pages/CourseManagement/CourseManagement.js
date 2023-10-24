import React, { useEffect, useState } from "react";

import ProductAPI from "../../../../api/product";
import PMCreate from "./Actions/PMCreate/PMCreate";
import PMEdit from "./Actions/PMEdit/PMEdit";


import Select from "react-select";
import "./CourseManagement.css";

const CourseManagement = () => {
  const [productList, setProductList] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [productDetail, setProductDetail] = useState(null);



  const [searchData, setSearchData] = useState({
    target: "name",
    value: "",
  });
  const searchOptions = [
    { value: "name", label: "Tên khóa học" }
  ];


  useEffect(() => {
    getProductData();
  }, []);

  const handleSelectSearchChange = (event) => {
    var sData = searchData;
    sData.target = event.value;
    setSearchData(sData);
  };

  const getProductData = () => {
    var user = JSON.parse(localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS"))
    ProductAPI.get({teacherId: user._id}).then((response) => {
      if (response.status === true) {
        setProductList(response.data.data);
        console.log(response.data.data);
      } else {
        setProductList([]);
      }
    });
  };

  const handleInputSearchChange = (event) => {
    var sData = searchData;
    sData.value = event.target.value;
    if (event.target.value == "") {
      getProductData();
    }
    setSearchData(sData);
  };

  
  const onHandleCreate = () => {
    setIsOpenCreate(true);
  };

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const closeModalCreate = () => {
    setIsOpenCreate(false);
    getProductData();
    // clear search action
    // searchClear();
  };

  const closeModalEdit = () => {
    setProductDetail(null);
    setIsOpenEdit(false);
    getProductData();
    // clear search action
    searchClear();
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

  const onHandleEdit = (product) => {
    setProductDetail(product);
    setIsOpenEdit(true);
  };

  return (
    <div>
      <div className="CourseManagement">
        <div className="CourseManagement-nav">
          <div className="CourseManagement-filter">
            <div className="search-bar">
              <div className="select-options">
                <Select
                  options={searchOptions}
                  defaultValue={searchOptions[0]}
                  onChange={handleSelectSearchChange}
                />
              </div>

              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="input-search"
                onChange={handleInputSearchChange}
              />
              {/* <i className="bi bi-search" onClick={onSearch}></i> */}
            </div>
          </div>
          <div className="CourseManagement-create">
            <button onClick={() => onHandleCreate()}>Tạo mới</button>
            <i className="bi bi-plus"></i>
          </div>
        </div>
        <div className="CourseManagement-content">
          <div className="PM-table">
            <div className="PM-header">
              <div className="P-name">Tên khóa học</div>
              <div className="P-category">Danh mục</div>
              <div className="P-price">Mức giá </div>
              <div className="P-amount-student">Tham gia</div>
              <div className="P-teacher">Giảng viên </div>
            </div>
            <div className="PM-body">
              {productList.map((product) => {
                return (
                  <div
                    className="P-item"
                    key={"PM-" + product._id}
                    onClick={() => onHandleEdit(product)}
                  >
                    <div className="P-name">{product.name}</div>
                    <div className="P-category">{product.categoryId.name}</div>
                    <div className="P-price">
                      {convertToCurrency(product.price)}
                    </div>
                    <div className="P-amount-student">
                      {product.students.length}
                    </div>
                    <div className="P-teacher">
                      {product.teacherId.fullName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      <div className="CourseManagement-create-container">
        <PMCreate
          isOpen={isOpenCreate}
          onRequestClose={closeModalCreate}
        ></PMCreate>
      </div>

      <div className="CourseManagement-edit-container">
        <PMEdit
          isOpen={isOpenEdit}
          onRequestClose={closeModalEdit}
          data={productDetail}
        ></PMEdit>
      </div>

    </div>
  );
};

export default CourseManagement;
