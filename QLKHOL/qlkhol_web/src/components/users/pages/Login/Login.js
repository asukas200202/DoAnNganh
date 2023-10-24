import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Login.css";



function Login() {
  const [userLogin, setUserLogin] = useState({});
  const navigate = useNavigate();



  const handleLogin = () => {
    // Gửi JSON body sử dụng Axios
    axios
      .post("http://localhost:4000/api/auth/login", userLogin)
      .then((response) => {
        // Xử lý phản hồi thành công
        if(response.data.success) {
          localStorage.setItem('JWT_Token', response.data.token);
          localStorage.setItem('QLKH_USER_DATA_LOGIN_SUCCESS', JSON.stringify(response.data.data));
          navigate('/');
        }
        else {
          
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        alert("Tên tài khoản hoặc mật khẩu không chính xác")
        console.log(error.response.data.message)
      });
  };

  const handleEmailChange = (event) => {
    const user = userLogin;
    if(event.target.value !== "") {
      user.email = event.target.value;
      setUserLogin(user)
    }
  }

  const handlePasswordChange = (event) => {
    const user = userLogin;
    if(event.target.value !== "") {
      user.password = event.target.value;
      setUserLogin(user)
    }
  }

  return (
    <div className="Login">
      <div className="login-container">
        <p className="title">Đăng nhập</p>
        <div className="login-field">
          <p>Địa chỉ email</p>
          <input type="text" placeholder="mail@example.com" onChange={e => handleEmailChange(e)}/>
        </div>
        <div className="login-field">
          <p>Mật khẩu</p>
          <input type="password" onChange={e => handlePasswordChange(e)}/>
        </div>
        <div className="login-field">
          <button onClick={() => handleLogin()}>Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
