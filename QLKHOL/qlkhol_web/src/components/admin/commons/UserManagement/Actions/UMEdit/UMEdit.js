import React, { useEffect, useState } from "react";
import "./UMEdit.css";
import Modal from "react-modal";
import Select from "react-select";
import diacritic from "diacritic";
import UserAPI from "../../../../../../api/user";

const UMEdit = (props) => {
  const [roleList, setRoleList] = useState([
    { value: "user", label: "Học viên" },
    { value: "teacher", label: "Giáo viên" },
    { value: "admin", label: "Quản trị viên" },
  ]);

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.data !== null) {
      setUserData(props.data);
    }
  }, [props]);

  const resetModelData = () => {
    setUserData({});
    // setRoleSelected({});
  };

  const onCloseModal = () => {
    resetModelData();
    props.onRequestClose();
  };

  const onUpdate = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn cập nhật dữ liệu mới này?"
    );

    if (result) {
      const updateUser = userData;
      UserAPI.update(updateUser).then((response) => {
        if (response.status === true) {
          onCloseModal();
        }
      });
    }
  };

  const onDelete = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này tiếp tục?"
    );
    if (result) {
      setIsLoading(true);
      UserAPI.delete(userData._id).then((response) => {
        if (response.status === true) {
            setIsLoading(false);
            onCloseModal();
        }
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, event) => {
    const { value } = event;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="UMEdit">
      <Modal isOpen={props.isOpen} contentLabel="Example Modal">
        <div className="UMEdit-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="UMEdit-content">
          <div className="title">
            <h4>Chỉnh sửa người dùng</h4>
          </div>

          <div className="create-container">
            <div className="create-form">
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



              <div className="field-input p-col-2">
                <p>Tên người dùng</p>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  value={userData.fullName}
                />
              </div>

              <div className="field-input p-col-2">
                <p>Chức vụ</p>
                <div style={{ paddingLeft: "3px" }}>
                  {props.data ? (
                    <Select
                      options={roleList}
                      name="categoryId"
                      defaultValue={roleList.find(role => role.value === props.data.role)}
                      onChange={(e) => handleSelectChange("role", e)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="field-input p-col-2">
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  value={userData.email}
                />
              </div>

              <div className="field-input p-col-2">
                <p>Mật khẩu</p>
                <input
                  type="text"
                  name="password"
                  onChange={handleInputChange}
                  value={userData.password}
                />
              </div>

              <div className="field-input p-col-1">
                <p>Giới thiệu</p>
                <textarea
                  rows={5}
                  name="intro"
                  onChange={handleInputChange}
                  value={userData.intro}
                />
              </div>



            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UMEdit;
