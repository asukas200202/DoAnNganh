import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Loading from "../../commons/Loading/Loading";


function Register() {
  const [userRegister, setUserRegister] = useState({});
  const [OtpStatus, setOtpStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (userRegister.password !== passConfirm) {
      alert("Mật khẩu bạn nhập vào không khớp vui lòng thử lại");
    } else {
      setIsLoading(true)
      axios
        .post("http://localhost:4000/api/auth/register", {
          email: userRegister.email,
        })
        .then((response) => {
          // Xử lý phản hồi thành công
          setIsLoading(false)
          if (response.data.success) {
            setOtpStatus(true);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          setIsLoading(false)
          alert("Không thể tạo tài khoản này vui lòng thử lại");
          console.log(error.response.data.message);
        });
    }
  };

  const handleEmailChange = (event) => {
    const user = userRegister;
    if (event.target.value !== "") {
      user.email = event.target.value;
      setUserRegister(user);
    }
  };

  const handleOtpChange = (event) => {
    if (event.target.value !== "") {
      setOtp(event.target.value);
    }
  };

  const handleOtpConfirm = () => {
    setIsLoading(true)
    axios
      .post("http://localhost:4000/api/auth/register/verify", {
        otp: otp,
        data: userRegister,
      })
      .then((response) => {
        // Xử lý phản hồi thành công
        setIsLoading(false)
        if (response.data.success) {
          navigate("/login");
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        setIsLoading(false)
        console.log(error.response.data.message);
      });
  };

  const handlePasswordChange = (event) => {
    const user = userRegister;
    if (event.target.value !== "") {
      user.password = event.target.value;
      setUserRegister(user);
    }
  };

  const handlePassConfirmChange = (event) => {
    if (event.target.value !== "") {
      setPassConfirm(event.target.value);
    }
  };

  const handleFullNameChange = (event) => {
    const user = userRegister;
    if (event.target.value !== "") {
      user.fullName = event.target.value;
      setUserRegister(user);
    }
  }

  return (
    <div>
      <div className="Register">
        {!OtpStatus ? (
          <div className="register-container">
            <p className="title">Đăng kí</p>
            <div className="register-field">
              <p>Địa chỉ email</p>
              <input
                type="text"
                placeholder="mail@example.com"
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className="register-field">
              <p>Họ và tên</p>
              <input
                type="text"
                onChange={(e) => handleFullNameChange(e)}
              />
            </div>
            <div className="register-field">
              <p>Mật khẩu</p>
              <input
                type="password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className="register-field">
              <p>Nhập lại mật khẩu</p>
              <input
                type="password"
                onChange={(e) => handlePassConfirmChange(e)}
              />
            </div>
            <div className="register-field">
              <button onClick={() => handleRegister()}>Đăng kí </button>
            </div>
          </div>
        ) : (
          <div className="verify-container">
            <p className="title">Xác nhận OTP</p>
            <div className="register-field">
              <p>Xác nhận mã OTP</p>
              <input
                type="text"
                onChange={(e) => handleOtpChange(e)}
                value={otp}
              />
            </div>
            <div className="register-field">
              <button onClick={() => handleOtpConfirm()}>Xác nhận </button>
            </div>
          </div>
        )}
      </div>

      <Loading isLoading={isLoading} /><Loading/>
    </div>
  );
}

export default Register;
