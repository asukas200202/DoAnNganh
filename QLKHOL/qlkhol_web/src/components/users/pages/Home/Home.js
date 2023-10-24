import React from 'react'
import { Outlet } from 'react-router-dom';
import Banner from "../../commons/Banner/Banner";
import "./Home.css"


function Home() {
  return (
    <div className='Home'>
        <Banner/>
        <div className='home-content'>
            <div className='section-1'>
                <h2>EduConnect</h2>
                <p>Nền tảng giáo dục kết nối, nơi mọi người đồng hành với nhau trong việc khám phá và phát triển khả năng bản thân.</p>
                <div className='section-list'>
                    <div className='section-item'>
                      <div className='image'>
                        <img src='https://img.freepik.com/premium-vector/technology-internet-education-service-obtain-knowledge-concept-online-learning-home-schooling-flat_121223-2157.jpg'/>
                      </div>
                      <p>Chất lượng</p>
                    </div>
                    <div className='section-item'>
                      <div className='image'>
                        <img src='https://assets.materialup.com/uploads/fec9cc3e-047b-4ab2-a7e7-deb044ce19eb/preview.jpg'/>
                      </div>
                      <p>Linh hoạt</p>
                    </div>
                    <div className='section-item'>
                      <div className='image'>
                        <img src='https://static.vecteezy.com/system/resources/previews/001/879/428/non_2x/company-income-statements-and-monthly-billing-financial-cooperation-agreements-document-email-government-budget-plans-purchasing-planning-report-illustration-of-website-banner-software-poster-free-vector.jpg'/>
                      </div>
                      <p>Hiệu quả</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home