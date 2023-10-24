import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import UserAPI from "../../../../api/user";

import UMEdit from "./Actions/UMEdit/UMEdit";
import Select from "react-select";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [searchData, setSearchData] = useState({
    target: "name",
    value: "",
  });

  const searchOptions = [{ value: "name", label: "Tên người dùng" }];
  useEffect(() => {
    getUserData();
  }, []);

  const onSearch = () => {
    console.log(searchData);
    UserAPI.search(searchData.target, searchData.value).then((response) => {
      if (response.status === true) {
        setUserList(response.data.data);
      } else {
        setUserList([]);
      }
    });
  };

  const getUserData = () => {
    UserAPI.get({}).then((response) => {
      console.log(response);
      if (response.status === true) {
        setUserList(response.data.data);
        console.log(response.data.data);
      } else {
        setUserList([]);
      }
    });
  };


  const onHandleEdit = (user) => {
    setUserDetail(user);
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


  const closeModalEdit = () => {
    setUserDetail(null);
    setIsOpenEdit(false);
    getUserData();
    // clear search action
    searchClear();
  };


  const handleInputSearchChange = (event) => {
    var sData = searchData;
    sData.value = event.target.value;
    if(event.target.value === "")
        getUserData()
    setSearchData(sData);
  };

  return (
    <div>
      <div className="UserManagement">
        <div className="UserManagement-nav">
          <div className="UserManagement-filter">
            <div className="search-bar">
              <div className="select-options">
                <Select
                  options={searchOptions}
                  defaultValue={searchOptions[0]}
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
          {/* <div className="UserManagement-create">
            <button onClick={() => onHandleCreate()}>Tạo mới</button>
            <i className="bi bi-plus"></i>
          </div> */}
        </div>
        <div className="UserManagement-content">
          <div className="UM-table">
            <div className="UM-header">
              <div className="U-name">Tên người dùng</div>
              <div className="U-email">Email</div>
              <div className="U-password">Mật khẩu</div>
              <div className="U-role">Chức vụ </div>
            </div>
            <div className="UM-body">
              {userList.map((user) => {
                return (
                  <div
                    className="U-item"
                    key={"UM-" + user._id}
                    onClick={() => onHandleEdit(user)}
                  >
                    <div className="U-name">{user.fullName}</div>
                    <div className="U-email">{user.email}</div>
                    <div className="U-password">{user.password}</div>
                    <div
                      className="U-role"
                      style={{
                        color: user.role == "admin" ? "red" : "black",
                      }}
                    >
                      {user.role}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="UserManagement-edit-container">
        <UMEdit
          isOpen={isOpenEdit}
          onRequestClose={closeModalEdit}
          data={userDetail}
        ></UMEdit>
      </div>
    </div>
  );
};

export default UserManagement;
