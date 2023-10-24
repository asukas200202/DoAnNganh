import React, { useEffect, useState } from "react";
import "./PMCreate.css";
import Modal from "react-modal";
import Select from "react-select";
import diacritic from "diacritic";
import DatePicker from "react-datepicker";
import CategoryAPI from "../../../../../../api/category";
import ProductAPI from "../../../../../../api/product";
import UploadAPI from "../../../../../../api/upload";
import Loading from "../../../Loading/Loading";

Modal.setAppElement('#root');

const PMCreate = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cateList, setCateList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    beginDate: new Date(),
    endDate: new Date(),
    shortDesc: "",
    teacherId: "",
    categoryId: "",
    alias: "",
    image: "",
  });

  useEffect(() => {
    CategoryAPI.get({}).then((response) => {
      if (response.status === true) {
        var categories = response.data.data;
        var options = [];
        categories.map((item) => {
          var option = {
            value: item._id,
            label: item.name,
          };
          options.push(option);
        });
        setCateList(options);
      }
    });
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, event) => {
    const { value } = event;
    setProductData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const createAlias = (name) => {
    const aliasName = diacritic
      .clean(name)
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Xóa các ký tự đặc biệt
      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng gạch ngang
    return aliasName;
  };


  const validateFieldRequired = () => {
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        const value = productData[key];
        // Kiểm tra các trường không được null, undefined, hoặc là chuỗi/kí tự rỗng
        if (value === null || value === undefined || value === '') {
          return false;
        }
      }
    }

    return true;
  } 

  const onCreate = async () => {
    setIsLoading(true);
    var userData = JSON.parse(
      localStorage.getItem("QLKH_USER_DATA_LOGIN_SUCCESS")
    );
    var newProduct = productData;
    newProduct.teacherId = userData._id;
    newProduct.alias = createAlias(newProduct.name);
    newProduct.image = await handleFileUpload();
    ProductAPI.create(newProduct).then((response) => {
      console.log(response)
      if (response.status === true) {
        setIsLoading(false);
        alert("Lưu sản phẩm thành công");
        setProductData({
          name: "",
          price: 0,
          beginDate: new Date(),
          endDate: new Date(),
          shortDesc: "",
          teacherId: "",
          categoryId: "",
          alias: "",
        });
        props.onRequestClose();
      } else {
        setIsLoading(false);
        alert("Bạn chưa điền đầy đủ thông tin cần thiết vui lòng kiểm tra lại")
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSelected(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const response = await UploadAPI.upload(selectedFile);
        if (response.status) {
          console.log(response.data);
          return response.data.url;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  };

  const onCloseModal = () => {
    setImageSelected(null)
    props.onRequestClose();
  }

  return (
    <div className="PMCreate">
      <Modal isOpen={props.isOpen} contentLabel="Example Modal">
        <div
          className="PMCreate-close"
          onClick={() => onCloseModal()}
        >
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="PMCreate-content">
          <div className="title">
            <h4>Tạo khóa học mới</h4>
          </div>
          <div className="create-container">
            <div className="create-form">
              <div className="save-button">
                <button onClick={onCreate}>
                  Lưu khóa học
                </button>
              </div>
              <div className="field-input p-col-1">
                <p>Tên khóa học <span>*</span></p>
                <input type="text" name="name" onChange={handleInputChange} />
              </div>
              <div className="field-input p-col-2">
                <p>Danh mục <span>*</span></p>
                <div style={{ paddingLeft: "3px" }}>
                  <Select
                    options={cateList}
                    name="categoryId"
                    onChange={(e) => handleSelectChange("categoryId", e)}
                  />
                </div>
              </div>

              <div className="field-input p-col-auto">
                <p>Giá khóa học <span>*</span></p>
                <input
                  type="number"
                  min={0}
                  name="price"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field-input p-col-3">
                <p>Bắt đầu</p>
                <DatePicker
                  selected={beginDate}
                  onChange={(date) => setBeginDate(date)}
                />
              </div>

              <div className="field-input p-col-3">
                <p>Kết thúc</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
              <div className="field-input p-col-1">
                <p>Mô tả ngắn về khóa học</p>
                <textarea
                  rows={5}
                  name="shortDesc"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="image-upload">
              <div className="image-upload-container">
                <input
                  type="file"
                  style={{ display: "hidden" }}
                  onChange={handleFileChange}
                />
                <div className="image-container">
                  <img
                    src={
                      imageSelected
                        ? imageSelected
                        : "https://www.sodapdf.com/blog/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Loading isLoading={isLoading}/>
    </div>
  );
};

export default PMCreate;
