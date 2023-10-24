import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import MenuDrop from "../MenuDrop/MenuDrop";
import { DataContext } from "../../../../context/DataContext";
import ProductAPI from "../../../../api/product";

function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const lastPathname = location.pathname.split("/").pop();
  const [isToggleMenu, setIstoggleMenu] = useState(false);
  const [isToggleCartMenu, setIsToggleCartMenu] = useState(false);
  const { cart, updateCart, removeFromCart } = useContext(DataContext);
  const [useData, setUserData] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [productSearch, setProductSearch] = useState([]);

  // Chuyển hướng đến đường dẫn mới
  const handleRedirect = (path) => {
    // Chuyển hướng đến đường dẫn mới
    navigate(path);
  };

  useEffect(() => {
    var token = localStorage.getItem("JWT_Token");
    if (token) {
      setIsAuth(true);
    }
    return () => {};
  });

  useEffect(() => {
    getLocalUserData();
    console.log(
      JSON.parse(localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS"))
    );
  }, []);

  const getLocalUserData = () => {
    var localUser = JSON.parse(
      localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS")
    );
    if (localUser) {
      setUserData(localUser);
    }
  };

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const toggleMenu = () => {
    setIstoggleMenu(!isToggleMenu);
  };

  const onLogout = () => {

    navigate("/login")
    setTimeout(() => {
      localStorage.removeItem("JWT_Token");
      localStorage.removeItem("QLKH_USER_DATA_LOGIN_SUCCESS");
      window.location.reload();
    }, 500);
  };

  const onToggleCartMenu = () => {
    setIsToggleCartMenu(!isToggleCartMenu);
  };

  const onCheckOut = () => {
    onToggleCartMenu();
    handleRedirect("/thanh-toan");
  };

  const onSearchChange = (event) => {
    setTimeout(() => {
      setIsSearchActive(true);
      ProductAPI.search("name", event.target.value).then((response) => {
        if (response.status === true) {
          console.log(response.data.data);
          setProductSearch(response.data.data);
        } else {
          setProductSearch([]);
        }
      });
    }, 1000);
  };

  const handleRedirectDetail = (route, slug, data) => {
    navigate(`/${route}/${slug}`, { state: data });
  };

  const onSearchLeave = () => {
    setIsSearchActive(false);
    setProductSearch([]);
  };

  return (
    <div className="Header">
      <div className="header-container">
        <div className="header-right">
          <div
            className="logo"
            onClick={() => handleRedirect("/")}
            style={{ cursor: "pointer" }}
          >
            <img src="https://sis.ou.edu.vn/logo-white.png"></img>
          </div>
          <div className="menu">
            <MenuDrop selected={lastPathname} />
          </div>
          <div className="search" onMouseLeave={() => onSearchLeave()}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm khóa học"
              onChange={(e) => onSearchChange(e)}
            />
            {isSearchActive ? (
              <div className="search-content">
                <p style={{ marginBottom: "20px" }}>Gợi ý tìm kiếm</p>
                <div className="product-s-list">
                  {productSearch.map((product) => {
                    return (
                      <div
                        className="item"
                        onClick={() =>
                          handleRedirectDetail(
                            "chi-tiet-khoa-hoc",
                            product.alias,
                            product
                          )
                        }
                      >
                        <div className="image">
                          <img src={product.image} />
                        </div>
                        <div className="info">
                          <p>{product.name}</p>
                          <p>{product.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="course-activation">
            <button onClick={() => handleRedirect("/khoa-hoc")}>Đăng ký khóa học</button>
          </div>
        </div>
        <div className="header-left">
          <div className="icon-shop">
            <i className="bi bi-cart3" onClick={() => onToggleCartMenu()}></i>
            <div className="cart-amount">
              <p>{cart.length}</p>
            </div>

            {!isToggleCartMenu ? (
              <></>
            ) : (
              <div className="cart-container">
                <div className="title">
                  <h4>Giỏ hàng</h4>
                </div>
                <div className="cart-list">
                  {cart.map((item) => {
                    return (
                      <div className="cart-item">
                        <div className="image">
                          <img src={item.image} />
                        </div>
                        <div className="info">
                          <div className="name">{item.name}</div>
                          <div className="teacher">
                            {item.teacherId.fullName}
                          </div>
                          <div className="price">
                            {convertToCurrency(item.price)}
                          </div>
                        </div>
                        <div className="delete">
                          <i
                            class="bi bi-x"
                            onClick={() => removeFromCart(item._id)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  {cart.length === 0 ? (
                    <p style={{ color: "#212121", textAlign: "center" }}>
                      Giỏ hàng hiện đang trống
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="checkout" onClick={() => onCheckOut()}>
                  Thanh toán
                </div>
              </div>
            )}
          </div>

          {!isAuth ? (
            <>
              <div className="sign-in">
                <button onClick={() => handleRedirect("/login")}>
                  Đăng nhập
                </button>
              </div>
              <div className="sign-up">
                <button onClick={() => handleRedirect("/register")}>
                  Đăng ký
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="nav-login">
                <div className="profile" onClick={toggleMenu}>
                  <img src="https://storage.googleapis.com/topica-media/5f990e55cb5acb5e85ce27a9/product/632451d24dee9a002607b795" />
                </div>
                {!isToggleMenu ? (
                  <></>
                ) : (
                  <div className="self-menu">
                    <ul>
                      <li>
                        <i className="bi bi-person-circle"></i>
                        <p>Thông tin cá nhân</p>
                      </li>
                      <li>
                        <i className="bi bi-heart"></i>
                        <p>Danh sách yêu thích</p>
                      </li>

                      {/* User role */}
                      {useData.role === "user" ? (
                        <li onClick={() => handleRedirect("/khoa-hoc-cua-toi")}>
                          <i className="bi bi-journal-check"></i>
                          <p>Khóa học của tôi</p>
                        </li>
                      ) : (
                        <></>
                      )}

                      {/* Teacher role */}
                      {useData.role === "teacher" || useData.role === "admin" ? (
                        <li onClick={() => handleRedirect("/quan-li-khoa-hoc")}>
                          <i className="bi bi-journal-check"></i>
                          <p>Quản lí khóa học</p>
                        </li>
                      ) : (
                        <></>
                      )}

                      <div className="line"></div>
                      <li onClick={() => handleRedirect("/dang-ki-giang-vien")}>
                        <i className="bi bi-book"></i>
                        <p>Trở thành giảng viên</p>
                      </li>
                      <div className="line"></div>
                      <li className="logout" onClick={onLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <p>Đăng xuất</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
