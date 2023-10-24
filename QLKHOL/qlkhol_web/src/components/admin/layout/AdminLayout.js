import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TotalCard from "../commons/TotalCard/TotalCard";
import "./AdminLayout.css";
import AuthAPI from "../../../api/auth";
import { useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigateAndReload = (path) => {
    window.location.href = path;
  };

  // get location admin path
  const location = useLocation();
  const path = location.pathname;
  const subPath = path.replace("/admin/", "");

  useEffect(() => {
    let isMounted = true;
    AuthAPI.checkPermissionRole().then((response) => {
      if (isMounted) {
        if (response) {
          setTimeout(() => {
            if (response.data.status && response.data.permission === 2) {
              setIsAdmin(true);
            } else {
              navigateAndReload("/");
            }
          }, 4000);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  });

  const handleRedirect = (route, slug, data) => {
    navigate(`/${route}/${slug}`, { state: data });
  };

  return (
    <div className="AdminLayout">
      {!isAdmin ? (
        <div className="loading">
          <img src="https://media.tenor.com/auhScD7xFKYAAAAC/gb-notebook.gif" />
          <h3>Đang thực hiện xác minh người dùng</h3>
          <h2>vui lòng chờ trong giây lát...</h2>
        </div>
      ) : (
        <div className="admin-container">
          <div className="admin-side">admin side</div>
          <div className="admin-management">
            <div className="totals-section">
              <div className="total-card">
                <TotalCard title="Total course" value="2" />
              </div>
              <div className="total-card">
                <TotalCard />
              </div>
              <div className="total-card">
                <TotalCard />
              </div>
              <div className="total-card">
                <TotalCard />
              </div>
            </div>
            <div className="statistics-main-section">
              <div className="statistics-main-section-container">
                <div className="nav">
                  <ul className="nav-list">
                    <li
                      className={`nav-item ${
                        subPath === "khoa-hoc" ? "nav-actived" : ""
                      }`}
                      onClick={() => handleRedirect("admin", "khoa-hoc", {})}
                    >
                      Khóa học
                    </li>
                    <li
                      className={`nav-item ${
                        subPath === "tai-khoan" ? "nav-actived" : ""
                      }`}
                      onClick={() => handleRedirect("admin", "tai-khoan", {})}
                    >
                      Tài khoản
                    </li>
                    <li
                      className={`nav-item ${
                        subPath === "danh-muc" ? "nav-actived" : ""
                      }`}
                      onClick={() => handleRedirect("admin", "danh-muc", {})}
                    >
                      Danh mục
                    </li>
                    <li
                      className={`nav-item ${
                        subPath === "don-hang" ? "nav-actived" : ""
                      }`}
                      onClick={() => handleRedirect("admin", "don-hang", {})}
                    >
                      Đơn hàng
                    </li>
                  </ul>
                </div>
                <div className="content-render">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
