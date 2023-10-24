import { useEffect } from "react";
import "./Card.css"
function Card(props){
    const product = props.data;

    useEffect(() => {
        console.log(props.data.categoryId.name)

    },[])


    return(
        <div className="Card">
           <div className="card-container">
                <div className="card-image"></div>
                <div className="card-info">
                    <div className="category">{product.categoryId.name}</div>
                    <div className="name">{product.name}</div>
                    <div className="short-desc text-ellipsis">
                        <p>Đối với doanh nhân trẻ thì việc thành lập công ty có lẽ không “đáng sợ” bằng quá trình điều hành, quản lý sao cho công ty phát triển ổn định, đảm bảo được mức doanh thu và lợi nhuận như dự tính ban đầu.</p>
                    </div>
                    <div className="teacher">Nguyễn Huy Hải</div>
                    <div className="price">399.000 đ</div>
                </div>
           </div>
        </div>
    );
}
export default Card;