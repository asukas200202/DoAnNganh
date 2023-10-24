import React, { useEffect, useState } from "react";
import "./PMEdit.css";
import Modal from "react-modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import CategoryAPI from "../../../../../../api/category";
import diacritic from "diacritic";
import ProductAPI from "../../../../../../api/product";
import UploadAPI from "../../../../../../api/upload";
import Loading from "../../../Loading/Loading";


Modal.setAppElement("#root");
const PMEdit = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cateList, setCateList] = useState([]);
  const [productData, setProductData] = useState({});
  const [cateSelected, setCateSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (props.data !== null) {
      CategoryAPI.get({}).then((response) => {
        if (response.status === true) {
          var categories = response.data.data;
          console.log(categories);
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

      var option = {
        value: props.data.categoryId._id,
        label: props.data.categoryId.name,
      };
      setImageSelected(props.data.image);
      setCateSelected({ ...option });
      setProductData(props.data);
    }
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

  const onUpdate = async () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn cập nhật dữ liệu mới này?"
    );

    if (result) {
      const updateProduct = productData;
      updateProduct.alias = createAlias(updateProduct.name);
      setIsLoading(true)
      updateProduct.image = await handleFileUpload();

      ProductAPI.update(updateProduct).then((response) => {
        if (response.status === true) {
          setIsLoading(false)
          onCloseModal();
        }
      });
    }
  };

  function getPublicIdFromUrl(url) {
    if (url) {
      const regex = /\/([^/]+)\.[^.]+$/;
      const match = url.match(regex);
      if (match) {
        return match[1];
      }
      return null;
    } else return null;
  }

  const onDelete = () => {
    const result = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này tiếp tục?"
    );
    if (result) {
      var imageId = getPublicIdFromUrl(productData.image);
      setIsLoading(true);
      ProductAPI.delete(productData._id).then((response) => {
        if (response.status === true) {
          UploadAPI.delete(imageId).then((response) => {
            setIsLoading(false);
            onCloseModal();
          });
        }
      });
    }
  };

  const resetModelData = () => {
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

    setCateSelected({});
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
          var imageId = getPublicIdFromUrl(productData.image);
          var imageDeleted = await UploadAPI.delete(imageId);
          if (imageDeleted) {
            return response.data.url;
          }
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  };

  const onCloseModal = () => {
    resetModelData();
    props.onRequestClose();
  };

  return (
    <div className="PMEdit">
      <Modal isOpen={props.isOpen} contentLabel="Example Modal">
        <div className="PMEdit-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="PMEdit-content">
          <div className="title">
            <h4>Chỉnh sửa khóa học</h4>
          </div>

          <div className="create-container">
            <div className="create-form">
              <div className="save-button">
                <button onClick={onDelete}>
                    xóa
                </button>
                <button onClick={onUpdate}>
                    cập nhật
                </button>
              </div>
              <div className="field-input p-col-1">
                <p>Tên khóa học<span>*</span></p>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={productData.name}
                />
              </div>
              <div className="field-input p-col-2">
                <p>Danh mục <span>*</span></p>
                <div style={{ paddingLeft: "3px" }}>
                  {props.data ? (
                    <Select
                      options={cateList}
                      name="categoryId"
                      defaultValue={{
                        value: props.data.categoryId._id,
                        label: props.data.categoryId.name,
                      }}
                      onChange={(e) => handleSelectChange("categoryId", e)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="field-input p-col-auto">
                <p>Giá khóa học <span>*</span></p>
                <input
                  type="number"
                  min={0}
                  name="price"
                  onChange={handleInputChange}
                  value={productData.price}
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
                  value={productData.shortDesc}
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

export default PMEdit;
