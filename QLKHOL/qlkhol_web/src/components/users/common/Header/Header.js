import "./Header.css"
import { useNavigate, useLocation } from 'react-router-dom'

import { useState, useEffect } from "react";
import MenuDrop from "../MenuDrop/MenuDrop";


function Header() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();
    const lastPathname = location.pathname.split('/').pop();

    // Chuyển hướng đến đường dẫn mới
    const handleRedirect = (path) => {
        // Chuyển hướng đến đường dẫn mới
        navigate(path);
    };

    useEffect(() => {
        console.log(lastPathname)
        var token = localStorage.getItem("JWT_Token")
        if(token) {
            setIsAuth(true)
        }
        return () => {
          console.log('Component đã bị xóa');
        };
    }); 



    
    return(
        <div className="Header"> 
            <div className="header-container">
                <div className="header-right">
                    <div className="logo">
                        <img src="https://sis.ou.edu.vn/logo-white.png"></img>
                    </div>
                    <div className="menu">
                       
                         <MenuDrop selected={lastPathname}/>
                    </div>
                    <div className="search">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Tìm kiếm khóa học"/>
                    </div>
                    <div className="course-activation">
                        <button>
                        Đăng ký khóa học 
                        </button>
                    </div>
                </div>
                <div className="header-left">
                    <div className="icon-menu">
                        <i className="bi bi-grid-fill"></i>
                    </div>
                    <div className="icon-shop">
                        <i className="bi bi-cart3"></i>
                    </div>
                    {
                        !isAuth 
                        ? <>
                            <div className="sign-in">
                                <button onClick={() => handleRedirect('/login')}>
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="sign-up">
                                <button onClick={() => handleRedirect('/register')}>
                                    Đăng ký
                                </button>
                            </div>
                        </> 
                        : 
                        <>
                            <div className="nav-login">
                                <div className="profile">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                                </div>
                            </div>
                        </>
                    }   
                </div>
            </div>
        </div>
    );
}
export default Header;