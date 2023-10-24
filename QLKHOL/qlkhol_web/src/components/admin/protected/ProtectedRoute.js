import React, { useEffect, useState } from "react";
import { Route, useLocation, Navigate, Outlet } from "react-router-dom";
import AuthAPI from "../../../api/auth";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AuthAPI.checkPermissionRole().then((response) => {
      if (isMounted) {
        if (response.status && response.permission === 2) {
          setIsAdmin(true);
        } else {
          alert("Bạn không có quyền truy cập trang web này vì lý do bảo mật");
          setIsAdmin(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Xác minh thành công, chuyển hướng tới trang admin chính hoặc về lai trang chủ
  return <Outlet />;
};

export default ProtectedRoute;
