import React from 'react'
import "./Footer.css"


const Footer = () => {
  return (
    <div className='Footer'>
        <div className='footer-container'>
            <div className='footer-col about'>
                <p>Về chúng tôi</p>
                <ul>
                    <li>Điều khoản</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>
            <div className='footer-col community'>
                <p>Cộng đồng</p>
                <ul>
                    <li>Chăm sóc khách hàng</li>
                    <li>Blog</li>
                    <li>Danh mục</li>
                </ul>
            </div>
            <div className='footer-col address'>
                <p>Địa chỉ</p>
                <ul>
                    <li>Công ty TNHH Công nghệ giáo dục EduConnect</li>
                    <li>MTT: 0000000000</li>
                    <li>Địa chỉ: Thành phố Hồ Chí Minh</li>
                    <li>Email: EduConnect@gmail.com</li>
                </ul>
            </div>
            <div className='footer-col social'>
                <p>Liên kết</p>
                <ul>
                    <li>
                        <img src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png'/>
                    </li>
                    <li><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png'/></li>
                    <li><img src='https://cdn-icons-png.flaticon.com/512/5602/5602732.png'/></li>

                </ul>
            </div>
        </div>
        <div className='copyright'>
            <p>© 2022 Công ty TNHH Công Nghệ Giáo Dục EduConnect Việt Nam</p>
        </div>
    </div>
  )
}

export default Footer