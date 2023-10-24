import React, { useEffect, useState } from "react";
import "./ProductManagement.css";
import ProductAPI from "../../../../api/product";
import PMCreate from "./Actions/PMCreate/PMCreate";
import PMEdit from "./Actions/PMEdit/PMEdit";
import Select from "react-select";

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [searchData, setSearchData] = useState({
    target: "name",
    value: "",
  });

  const searchOptions = [
    { value: "name", label: "Tên khóa học" },
    { value: "teacher", label: "Tên giáo viên" },
  ];  
  useEffect(() => {
    getProductData();
  }, []);

  const onSearch = () => {
    console.log(searchData);
    ProductAPI.search(searchData.target, searchData.value).then((response) => {
      if (response.status === true) {
        setProductList(response.data.data);
      } else {
        setProductList([]);
      }
    });
  };

  const getProductData = () => {
    ProductAPI.get({}).then((response) => {
      if (response.status === true) {
        setProductList(response.data.data);
        console.log(response.data.data);
      } else {
        setProductList([]);
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

  const onHandleEdit = (product) => {
    setProductDetail(product);
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
    getProductData();
    // clear search action
    searchClear();
  };

  const closeModalEdit = () => {
    setProductDetail(null);
    setIsOpenEdit(false);
    getProductData();
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
    if (event.target.value === "") {
      getProductData();
    }
    setSearchData(sData);
  };

  return (
    <div>
      <div className="ProductManagement">
        <div className="ProductManagement-nav">
          <div className="ProductManagement-filter">
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
          <div className="ProductManagement-create">
            <button onClick={() => onHandleCreate()}>Tạo mới</button>
            <i className="bi bi-plus"></i>
          </div>
        </div>
        <div className="ProductManagement-content">
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
                    <div className="P-amount-student">{product.students.length}</div>
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

      <div className="ProductManagement-create-container">
        <PMCreate
          isOpen={isOpenCreate}
          onRequestClose={closeModalCreate}
        ></PMCreate>
      </div>

      <div className="ProductManagement-edit-container">
        <PMEdit
          isOpen={isOpenEdit}
          onRequestClose={closeModalEdit}
          data={productDetail}
        ></PMEdit>
      </div>
    </div>
  );
};

export default ProductManagement;
