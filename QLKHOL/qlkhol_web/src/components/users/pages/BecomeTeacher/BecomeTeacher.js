import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./BecomeTeacher.css";
import TeachingImage from "../../../../assets/teaching.jpg";
import UserAPI from "../../../../api/user"


const BecomeTeacher = () => {
  const navigate = useNavigate();

  const onConfirmRules = () => {
    var user = JSON.parse(localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS"))

    if (user) {
      if (user.role === "user") {
        user.role = "teacher";
        UserAPI.update(user).then(response => {
          alert("Bạn đã trở thành giảng viên !")
          localStorage.setItem("QLKH_USER_DATA_LOGIN_SUCCESS", JSON.stringify(user))
          navigate("/")
        })
      }
      else if (user.role === "teacher") {
        alert("Bạn đang là giảng viên của EduConnect rồi nè !")
      }
    }
  }

  return (
    <div style={{padding: "30px 0px"}}>
      <div className="BecomeTeacher">
        <div className="register-container">
          <div className="image">
            <img src={TeachingImage} />
          </div>
          <div className="rules-content">
            <h2>Điều khoản </h2>
            <div className="content">
              <h3>Điều khoản và Bản cam kết của Giảng viên Trực tuyến</h3>
              <p className="sub-title">
                Chào mừng bạn đến với{" "}
                <span style={{ fontWeight: "bold" }}>EduConnect</span>! Bạn đang
                đăng ký trở thành một giảng viên trực tuyến trên trang web của
                chúng tôi. Trước khi tiếp tục, vui lòng đọc và đồng ý với các điều
                khoản và điều kiện dưới đây.
              </p>
              <div className="rules-list">
                <ul>
                  1. Cam kết chất lượng:
                  <li>
                    Tôi cam kết cung cấp những khóa học chất lượng cao, chuyên môn
                    và chính xác.
                  </li>
                  <li>
                    Tôi cam kết truyền đạt kiến thức và kỹ năng một cách rõ ràng
                    và dễ hiểu cho học viên.
                  </li>
                  <li>
                    Tôi cam kết tôn trọng và đối xử công bằng với tất cả học viên,
                    không phân biệt đối xử dựa trên giới tính, chủng tộc, quốc
                    tịch, tôn giáo, hoặc bất kỳ yếu tố nào khác.
                  </li>
                </ul>

                <ul>
                  2. Nội dung khóa học:
                  <li>
                    Tôi cam kết rằng tất cả nội dung khóa học được cung cấp bởi
                    tôi là đúng, sát với thực tế và không vi phạm bất kỳ quyền sở
                    hữu trí tuệ nào.
                  </li>
                  <li>
                    Tôi cam kết tạo ra nội dung được cập nhật, đáng tin cậy và phù
                    hợp với lĩnh vực mà tôi giảng dạy.
                  </li>
                </ul>

                <ul>
                  3. Đảm bảo học viên:
                  <li>
                    Tôi cam kết tạo môi trường học tập an toàn, khuyến khích và
                    đáng tin cậy cho học viên.
                  </li>
                  <li>
                    Tôi cam kết hỗ trợ học viên trong quá trình học tập, trả lời
                    câu hỏi và cung cấp sự phản hồi xây dựng.
                  </li>
                </ul>

                <ul>
                  4. Tuân thủ quy định:
                  <li>
                    Tôi cam kết tuân thủ tất cả các quy định và quy tắc của{" "}
                    <span style={{ fontWeight: "bold" }}>EduConnect</span> liên
                    quan đến việc trở thành giảng viên và cung cấp khóa học trực
                    tuyến.
                  </li>
                </ul>

                <ul>
                  5. Bảo mật thông tin:
                  <li>
                    Tôi cam kết bảo mật thông tin cá nhân và dữ liệu của học viên,
                    không tiết lộ cho bên thứ ba mà không có sự đồng ý của học
                    viên.
                  </li>
                </ul>
                <ul>
                  6. Cập nhật và phản hồi:
                  <li>
                    Tôi cam kết cung cấp cập nhật thường xuyên và phản hồi đúng
                    thời hạn cho các yêu cầu và thông báo từ{" "}
                    <span style={{ fontWeight: "bold" }}>EduConnect</span>.
                  </li>
                </ul>
                <ul>
                  6. Chấm dứt hợp đồng:
                  <li>
                    Tôi hiểu rằng{" "}
                    <span style={{ fontWeight: "bold" }}>EduConnect</span> có
                    quyền chấm dứt hợp đồng và chấm dứt quyền truy cập của tôi vào
                    trang web nếu tôi vi phạm bất kỳ điều khoản nào trong cam kết
                    này.
                  </li>
                </ul>
              </div>
            </div>
            <div className="rules-confirm">
              <button onClick={onConfirmRules}>Đồng ý điều khoản và xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default BecomeTeacher;
