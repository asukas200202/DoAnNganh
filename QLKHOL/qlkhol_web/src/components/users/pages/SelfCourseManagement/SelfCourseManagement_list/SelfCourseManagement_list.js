import React, { useEffect, useState } from "react";
import "./SelfCourseManagement_list.css";
import ProductAPI from "../../../../../api/product";
import Card from "../../../commons/Card/Card";
import { useParams, useNavigate, Outlet } from 'react-router-dom';




const SelfCourseManagement_list = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS"));
    if (user) {
      ProductAPI.get({ userId: user._id }).then((response) => {
        if (response.status === true) {
          console.log(response);
          setProductList(response.data.data);
        } else {
          setProductList([]);
        }
      });
    }
  }, []);

  const handleRedirect = (route, slug, data) => {
    navigate(`/${route}/${slug}`, { state: data });
  };
  return (
    <div className="SelfCourseManagement_list">
      <div className="SelfCourseManagement-container">
        <div className="title">
          <h2>Khóa học của tôi</h2>
        </div>
        <div className="main">
          <div className="product-list">
            <div className="product-list-inner">
              {productList.map((product) => {
                return (
                  <div
                    className="product-item"
                    key={product._id}
                    onClick={() =>
                      handleRedirect("khoa-hoc-cua-toi", product.alias, product)
                    }
                  >
                    <Card data={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCourseManagement_list;
