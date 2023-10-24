import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductView.css";
import Card from "../../commons/Card/Card";
import CategoryAPI from "../../../../api/category";
import ProductAPI from "../../../../api/product";
import UserAPI from "../../../../api/user";

const ProductView = () => {
  const [cateList, setCateList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cate, setCate] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    target: "teacher",
    value: "",
  });

  useEffect(() => {
   
  }, []);

  const getCateggory = (cateList) => {
    cateList.map((cate) => {
      if (cate.alias === category) {
        setCate(cate);
      }
    });
  };

  const handleRedirect = (route, slug, data) => {
    navigate(`/${route}/${slug}`, { state: data });
  };

  useEffect(() => {
    CategoryAPI.get({}).then((response) => {
      if (response.status === true) {
        getCateggory(response.data.data);
        setCateList(response.data.data);
      }
    });

    ProductAPI.get({ category: category }).then((response) => {
      if (response.status === true) {
        console.log(response.data.data);
        setProductList(response.data.data);
      } else {
        setProductList([]);
      }
    });
  }, [category]);


  const onSearch = () => {
    ProductAPI.search(searchData.target, searchData.value).then((response) => {
      if (response.status === true) {
        setProductList(response.data.data);
      } else {
        setProductList([]);
      }
    });
  };

  const handleInputSearchChange = (event) => {
    var sData = searchData;
    sData.value = event.target.value;
    sData.target = event.target.name;
    if (event.target.value === "") {
      ProductAPI.get({ category: category }).then((response) => {
        if (response.status === true) {
          console.log(response.data.data);
          setProductList(response.data.data);
        } else {
          setProductList([]);
        }
      });
    }
    setSearchData(sData);
  };

  return (
    <div className="ProductView">
      <div className="title">
        <p>{cate.name}</p>
      </div>
      <div
        className="banner"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%), url(https://cdn2.topica.vn/5f990e55cb5acb5e85ce27a9/product/619bce416d05dc00250104d2)",
        }}
      ></div>
      <div className="product-list-layout">
        <div className="product-side-category-container">
          <div className="product-side">
            <div className="sticky-container">
              <div className="product-side-category">
                <div className="title-side">
                  <h4>Tìm kiếm</h4>
                </div>
                <div className="cate-list">
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo giáo viên ..."
                      className="input-search"
                      name="teacher"
                      onChange={handleInputSearchChange}
                    />
                    <i className="bi bi-search" onClick={onSearch}></i>
                  </div>
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên khóa học ..."
                      className="input-search"
                      name="name"
                      onChange={handleInputSearchChange}
                    />
                    <i className="bi bi-search" onClick={onSearch}></i>
                  </div>
                </div>
              </div>

              <div className="product-side-category">
                <div className="title-side">
                  <h4>Danh mục </h4>
                </div>
                <div className="cate-list">
                  {cateList.map((cate) => {
                    return (
                      <div
                        className={`cate-item ${
                          category === cate.alias ? "text-highlight" : ""
                        }`}
                        key={cate._id}
                        onClick={() =>
                          handleRedirect("khoa-hoc", cate.alias, {})
                        }
                      >
                        {cate.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="product-list">
            <div className="product-list-inner">
              {productList.map((product) => {
                return (
                  <div
                    className="product-item"
                    key={product._id}
                    onClick={() =>
                      handleRedirect(
                        "chi-tiet-khoa-hoc",
                        product.alias,
                        product
                      )
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

export default ProductView;
