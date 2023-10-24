import React, { useEffect, useState, useRef } from "react";
import "./SelfCourseManagement_detail.css";
import { useLocation } from "react-router-dom";

const SelfCourseManagement_detail = () => {
  const location = useLocation();
  const product = location.state;
  const [lession, setLession] = useState("");
  const [key, setKey] = useState(0);
  const videoRef = useRef();



  useEffect(() => {

    checkLincenseProduct();
  }, []);

  useEffect(() => {    
    videoRef.current?.load();
  }, [lession]);

  const checkLincenseProduct = () => {};

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  const handleVideoChange = (lession) => {
    setLession(lession)
    setKey((prevKey) => prevKey + 1);
  }

  return (
    <div className="SelfCourseManagement_detail">
      <div className="banner">
        <img src="https://res.cloudinary.com/dbrdml9bf/image/upload/v1638449082/topica/wave_iabqmr.png" />
        <div className="title">
          <div className="name">{product.name}</div>
          <div className="short-desc">
            <p>{product.shortDesc}</p>
          </div>
          <p>Giảng viên: {product.teacherId.fullName}</p>
        </div>
      </div>
      <div className="main">
        <div className="infomation">
          <div className="video-container">
            <video controls ref={videoRef}>
              <source src={lession.video} type="video/mp4" controls />
              {/* Thêm các nguồn video khác (nếu có) */}
            </video>
            <div className="lession-name">{lession.name}</div>
            <div className="lession-description">{lession.description}</div>
          </div>
          <div className="lession-container">
            <div className="title">
              <i class="bi bi-list-task"></i>
              <p>Danh sách bài học</p>
            </div>
            <div className="lession-list">
              {product.lessions.map((lession) => {
                return <div className="lession-item" key={"video_" + product._id + "_" + lession._id} onClick={() => handleVideoChange(lession)}>{lession.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCourseManagement_detail;
