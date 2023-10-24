import React, { useEffect, useState } from "react";
import "./CMCreate.css";
import Modal from "react-modal";
// import Select from "react-select";
import diacritic from "diacritic";
// import DatePicker from "react-datepicker";
import CategoryAPI from "../../../../../../api/category";
import Loading from "../../../Loading/Loading"

Modal.setAppElement('#root');
const CMCreate = (props) => {
  const [categoryData, setCategoryData] = useState({
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const onCloseModal = () => {
    props.onRequestClose();
  };

  const createAlias = (name) => {
    const aliasName = diacritic
      .clean(name)
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Xóa các ký tự đặc biệt
      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng gạch ngang
    return aliasName;
  };

  const onCreate = async () => {
    setIsLoading(true);
    var newCategory = categoryData;
    newCategory.alias = createAlias(newCategory.name) 
    CategoryAPI.create(newCategory).then((response) => {
      if (response.status === true) {
        setIsLoading(false);
        setCategoryData({
          name: ""
        });
        onCloseModal();
      } else {
        setIsLoading(false);
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="CMCreate">
      <Modal isOpen={props.isOpen} contentLabel="Example Modal" id="CMCreate-modal">
        <div className="CMCreate-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="CMCreate-content">
          <div className="title">
            <h4>Tạo danh mục mới</h4>
          </div>
          <div className="create-container">
            <div className="create-form">
              <div className="field-input p-col-1">
                <p>Tên danh mục</p>
                <input type="text" name="name" onChange={handleInputChange} />
              </div>
              <div className="save-button">
                <button onClick={onCreate}>
                    Lưu danh mục
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Loading isLoading={isLoading}/>
    </div>
  );
};

export default CMCreate;
