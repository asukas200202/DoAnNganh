import "./Section.css"
import Card from "../Card/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Section(props){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    // const [courselist, setCourselist]=useState(
    //     [
    //         {
    //             name: "Lập trình - CNTT",
    //             img: "https://edumall.vn/_next/image?url=%2Fapi%2Fimageproxy%3Furl%3Dhttps%253A%252F%252Fcdn2.topica.vn%252F811e34a8-702e-4d32-9137-4bf4df38488a%252Fproduct%252F62e1eedb2386b30026fdd90c&w=1920&q=50",
    //             nameSubject: "Procedural Python - Lập trình hàm trong Python",
    //             description: "Tiếp nối các kiến thức đã học trong khóa Python cơ bản trước đó, khóa Lập trình hàm trong Python sẽ giúp bạn nắm bắt sơ lược các khái niệm về hàm, thực hành xây dựng, sử dụng hàm",
    //             teacher: "Phạm Quốc Anh",
    //             price: "199.000"
    //         },
    //         {
    //             name: "Lập trình - CNTT",
    //             img:"https://edumall.vn/_next/image?url=%2Fapi%2Fimageproxy%3Furl%3Dhttps%253A%252F%252Fcdn2.topica.vn%252F811e34a8-702e-4d32-9137-4bf4df38488a%252Fproduct%252F62a9865f436a3b0025d7886c&w=1920&q=50",
    //             nameSubject: "Procedural Python - Lập trình hàm trong Python",
    //             description: "Tiếp nối các kiến thức đã học trong khóa Python cơ bản trước đó, khóa Lập trình hàm trong Python sẽ giúp bạn nắm bắt sơ lược các khái niệm về hàm, thực hành xây dựng, sử dụng hàm",
    //             teacher: "Phạm Quốc Anh",
    //             price: "199.000"
    //         },
    //         {
    //             name: "Lập trình - CNTT",
    //             img:"https://edumall.vn/_next/image?url=%2Fapi%2Fimageproxy%3Furl%3Dhttps%253A%252F%252Fcdn2.topica.vn%252Ff7ecfb70-dd5f-44d0-bc67-2f662e2998b3%252Fproduct%252F62f378df16c3b200255dfe0d&w=1920&q=50",
    //             nameSubject: "Procedural Python - Lập trình hàm trong Python",
    //             description: "Tiếp nối các kiến thức đã học trong khóa Python cơ bản trước đó, khóa Lập trình hàm trong Python sẽ giúp bạn nắm bắt sơ lược các khái niệm về hàm, thực hành xây dựng, sử dụng hàm",
    //             teacher: "Phạm Quốc Anh",
    //             price: "199.000"
    //         },
    //         {
    //             name: "Lập trình - CNTT",
    //             img:"https://edumall.vn/_next/image?url=%2Fapi%2Fimageproxy%3Furl%3Dhttps%253A%252F%252Fcdn2.topica.vn%252F2fbd3ee1-a3a6-4651-b180-34d6960eca02%252Fproduct%252F63ae5f68d45fde00262e6064&w=1920&q=50",
    //             nameSubject: "Procedural Python - Lập trình hàm trong Python",
    //             description: "Tiếp nối các kiến thức đã học trong khóa Python cơ bản trước đó, khóa Lập trình hàm trong Python sẽ giúp bạn nắm bắt sơ lược các khái niệm về hàm, thực hành xây dựng, sử dụng hàm",
    //             teacher: "Phạm Quốc Anh",
    //             price: "199.000"
    //         },
    //         {
    //             name: "Lập trình - CNTT",
    //             img:"https://edumall.vn/_next/image?url=%2Fapi%2Fimageproxy%3Furl%3Dhttps%253A%252F%252Fcdn2.topica.vn%252F2fbd3ee1-a3a6-4651-b180-34d6960eca02%252Fproduct%252F63ae5f68d45fde00262e6064&w=1920&q=50",
    //             nameSubject: "Procedural Python - Lập trình hàm trong Python",
    //             description: "Tiếp nối các kiến thức đã học trong khóa Python cơ bản trước đó, khóa Lập trình hàm trong Python sẽ giúp bạn nắm bắt sơ lược các khái niệm về hàm, thực hành xây dựng, sử dụng hàm",
    //             teacher: "Phạm Quốc Anh",
    //             price: "199.000"
    //         },
    //     ]
    // )

    const [courselist, setCourselist]= useState([])
    

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
        .then(response => {
            setCourselist(response.data);
      
        })
        .catch(error => {
            console.error('Error retrieving products', error);
        });

        
    }, []);

    return(
        <div className="Section">
            <div className="title">
            Khóa học chất lượng cao được sản xuất bởi Edumall
            </div>
            <div className="description">
            Những khóa học được Edumall sản xuất theo tiêu chuẩn chất lượng cao đối với học tập trực tuyến dựa trên ba trụ cột: Học liệu chất lượng quốc tế; Giảng viên & chuyên gia chất lượng cao, uy tín, kinh nghiệm; Mô hình học tập đa tương tác & định hướng kết quả đầu ra được tích hợp công nghệ giáo dục tiên tiến, cập nhật nhất.
            </div>
            <div className="section-list">
                <Carousel responsive={responsive}>
                    {
                        courselist.map(course => {
                            return  <div className="section-item" key="course.id">
                                        <Card img={course.image} name={course.name} nameSubject={course.nameSubject} description={course.description} teacher={course.teacher} price={course.price} ></Card>
                                    </div>
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
}
export default Section;