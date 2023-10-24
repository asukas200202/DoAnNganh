import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../components/users/pages/Home/Home";
import Login from "../components/users/pages/Login/Login";
import Header from "../components/users/commons/Header/Header";
import Register from "../components/users/pages/Register/Register";
import ProductView from "../components/users/pages/ProductView/ProductView";
import ProductDetail from "../components/users/pages/ProductDetail/ProductDetail";
import UserLayout from "../components/users/layout/UserLayout";
import AdminLayout from "../components/admin/layout/AdminLayout";
import ProductManagement from "../components/admin/commons/ProductManagement/ProductManagement";
import AuthAPI from "../api/auth";
import CategoryManagement from "../components/admin/commons/CategoryManagement/CategoryManagement";
import UserManagement from "../components/admin/commons/UserManagement/UserManagement";
import Payment from "../components/users/pages/Payment/Payment";
import { DataProvider } from "../context/DataContext";
import OrderManagement from "../components/admin/commons/OrderManagement/OrderManagement";
import BecomeTeacher from "../components/users/pages/BecomeTeacher/BecomeTeacher";
import CourseManagement from "../components/users/pages/CourseManagement/CourseManagement";
import SelfCourseManagement from "../components/users/pages/SelfCourseManagement/SelfCourseManagement";
import SelfCourseManagement_list from "../components/users/pages/SelfCourseManagement/SelfCourseManagement_list/SelfCourseManagement_list";
import SelfCourseManagement_detail from "../components/users/pages/SelfCourseManagement/SelfCourseManagement_detail/SelfCourseManagement_detail";
import Footer from "../components/users/commons/Footer/Footer";

const AppRoutes = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isAdminRoute) {
      AuthAPI.checkPermissionRole().then((response) => {
        if (isMounted) {
          if (response.status && response.permission === 2) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [isAdminRoute]);

  return (
    <div style={{height: "100%"}}>
      <Router>
        <DataProvider>
          {!isAdminRoute && <Header />}
          <Routes>
            {/* User router */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="login" element={<Login />} />

              <Route path="dang-ki-giang-vien" element={<BecomeTeacher />} />

              <Route path="khoa-hoc-cua-toi" element={<SelfCourseManagement />}>
                <Route index element={<SelfCourseManagement_list />} />
                <Route path=":name" element={<SelfCourseManagement_detail />} />
              </Route>

              <Route path="quan-li-khoa-hoc" element={<CourseManagement />} />

              <Route path="register" element={<Register />} />

              <Route path="khoa-hoc" element={<ProductView />}>
                <Route path=":category" element={<ProductView />} />
              </Route>

              <Route path="thanh-toan" element={<Payment />}></Route>

              <Route path="chi-tiet-khoa-hoc" element={<ProductDetail />}>
                <Route path=":name" element={<ProductDetail />} />
              </Route>
            </Route>

            {/* Admin router */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="khoa-hoc" element={<ProductManagement />} />
              <Route path="danh-muc" element={<CategoryManagement />} />
              <Route path="tai-khoan" element={<UserManagement />} />
              <Route path="don-hang" element={<OrderManagement />} />
            </Route>
          </Routes>
          <Footer />
        </DataProvider>
      </Router>
    </div>
  );
};

export default AppRoutes;
