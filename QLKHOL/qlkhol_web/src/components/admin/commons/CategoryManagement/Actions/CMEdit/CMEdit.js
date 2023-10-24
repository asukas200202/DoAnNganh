import React, { useEffect, useState } from "react";
import "./CMEdit.css";
import Modal from "react-modal";
import category from "../../../../../../api/category";
// import Select from "react-select";
// import DatePicker from "react-datepicker";

import diacritic from "diacritic";
import CategoryAPI from "../../../../../../api/category";
import Loading from "../../../Loading/Loading"


Modal.setAppElement('#root');
const CMEdit = (props) => {
  const [categoryData, setCategoryData] = useState({
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if(props.data) {
         setCategoryData(props.data);
    }
  },[props])

  const onCloseModal = () => {
    // resetModelData();
    props.onRequestClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDelete = () => {
    const result = window.confirm("Bạn có chắc chắn muốn xóa khóa học này tiếp tục?");
    if (result) {
      setIsLoading(true);
      CategoryAPI.delete(categoryData._id).then((response) => {
        if (response.status === true) {
          setIsLoading(false);
          onCloseModal();
        }
      });
    }
  };

  const createAlias = (name) => {
    const aliasName = diacritic
      .clean(name)
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Xóa các ký tự đặc biệt
      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng gạch ngang
    return aliasName;
  };

  const onUpdate = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn cập nhật dữ liệu mới này?"
    );
    if (result) {
      setIsLoading(true)
      const updateCategory = categoryData
      updateCategory.alias = createAlias(updateCategory.name)
      CategoryAPI.update(updateCategory).then((response) => {
        if (response.status === true) {
          setIsLoading(false)
          onCloseModal();
        }
      });
    }
  };

  return (
    <div className="CMEdit"> 
      <Modal isOpen={props.isOpen} contentLabel="Example Modal" id="CMEdit-modal">
        <div className="CMEdit-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="CMEdit-content">
          <div className="title">
            <h4>Chỉnh sửa khóa học</h4>
          </div>

          <div className="create-container">
            <div className="create-form">
             
              <div className="field-input p-col-1">
                <p>Tên khóa học</p>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={categoryData.name}
                />
              </div>
             
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
      </Modal>
      <Loading isLoading={isLoading}/>
    </div>
  );
};

export default CMEdit;
