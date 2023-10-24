import React, { useEffect, useState } from "react";
import "./CategoryManagement.css";
import CategoryAPI from "../../../../api/category";
import CMCreate from "./Actions/CMCreate/CMCreate";
import CMEdit from "./Actions/CMEdit/CMEdit";
import Select from "react-select";

const CategoryManagement = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [searchData, setSearchData] = useState({
    target: "name",
    value: "",
  });

  const searchOptions = [
    { value: "name", label: "Tên danh mục" },
  ];
  useEffect(() => {
    getCategoryData();
  }, []);

  const onSearch = () => {
    console.log(searchData);
    CategoryAPI.search(searchData.target, searchData.value).then((response) => {
      if (response.status === true) {
        setCategoryList(response.data.data);
      } else {
        setCategoryList([]);
      }
    });
  };
  

  const getCategoryData = () => {
    CategoryAPI.get().then((response) => {
      if (response.status === true) {
        setCategoryList(response.data.data);
        console.log(response.data.data);
      } else {
        setCategoryList([]);
      }
    });
  };

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const onHandleCreate = () => {
    setIsOpenCreate(true);
  };

  const onHandleEdit = (catrgory) => {
    setCategoryDetail(catrgory);
    setIsOpenEdit(true);
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

  const closeModalCreate = () => {
    setIsOpenCreate(false);
    getCategoryData();
    // clear search action
    searchClear();
  };

  const closeModalEdit = () => {
    setCategoryDetail(null);
    setIsOpenEdit(false);
    getCategoryData();
    // clear search action
    searchClear();
  };

  const handleSelectSearchChange = (event) => {
    var sData = searchData;
    sData.target = event.value;
    setSearchData(sData);
  };

  const handleInputSearchChange = (event) => {
    var sData = searchData;
    sData.value = event.target.value;
    if(event.target.value === "") {
        getCategoryData();
    }
    setSearchData(sData);
  };

  return (
    <div>
      <div className="CategoryManagement">
        <div className="CategoryManagement-nav">
          <div className="CategoryManagement-filter">
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
              <i className="bi bi-search" onClick={onSearch}></i>
            </div>
          </div>
          <div className="CategoryManagement-create">
            <button onClick={() => onHandleCreate()}>Tạo mới</button>
            <i className="bi bi-plus"></i>
          </div>
        </div>
        <div className="CategoryManagement-content">
          <div className="CM-table">
            <div className="CM-header">
              <div className="C-name">Tên danh mục</div>
            </div>
            <div className="CM-body">
              {categoryList.map((category) => {
                return (
                  <div
                    className="C-item"
                    key={"CM-" + category._id}
                    onClick={() => onHandleEdit(category)}
                  >
                    <div className="C-name">{category.name}</div>
                    {/* <div className="C-category">{product.categoryId.name}</div>
                    <div className="C-price">
                      {convertToCurrency(product.price)}
                    </div>
                    <div className="C-amount-student">0</div>
                    <div className="C-teacher">
                      {product.teacherId.fullName}
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="CategoryManagement-create-container">
        <CMCreate
          isOpen={isOpenCreate}
          onRequestClose={closeModalCreate}
        ></CMCreate>
      </div>

      <div className="CategoryManagement-edit-container">
        <CMEdit
          isOpen={isOpenEdit}
          onRequestClose={closeModalEdit}
          data={categoryDetail}
        ></CMEdit>
      </div>
    </div>
  );
};

export default CategoryManagement;
