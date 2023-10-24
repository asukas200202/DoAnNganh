import React, { useEffect, useState } from "react";

import ProductAPI from "../../../../api/product";
import Card from "../../commons/Card/Card";
import { useParams, useNavigate, Outlet } from 'react-router-dom';


const SelfCourseManagement = () => {
  return (
    <div className="SelfCourseManagement">
      <Outlet/>
    </div>
  );
};

export default SelfCourseManagement;
