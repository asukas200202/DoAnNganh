import React, { useEffect, useState } from "react";
import "./PMEdit.css";
import Modal from "react-modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import CategoryAPI from "../../../../../../api/category";
import diacritic from "diacritic";
import ProductAPI from "../../../../../../api/product";
import UploadAPI from "../../../../../../api/upload";
import Loading from "../../../../commons/Loading/Loading";
import LMCreate from "../LMCreate/LMCreate";
import VideoPlayer from "../../../../commons/VideoPlayer/VideoPlayer";

Modal.setAppElement("#root");
const PMEdit = (props) => {

  const [cateList, setCateList] = useState([]);
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLession, setIsLession] = useState(false);
  const [isOpenVideo, setIsOpenVideo] =  useState(false);
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (props.data !== null) {
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

      var option = {
        value: props.data.categoryId._id,
        label: props.data.categoryId.name,
      };
      setImageSelected(props.data.image);
      console.log(props.data);
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
      setIsLoading(true);
      updateProduct.image = await handleFileUpload();

      ProductAPI.update(updateProduct).then((response) => {
        if (response.status === true) {
          setIsLoading(false);
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

  const openLession = () => {
    setIsLession(true);
  };

  const closeModalLession = () => {
    setIsLession(false);
  };

  const onPlay = (url) => {
    setUrl(url);
    setIsOpenVideo(true)
  }

  const closeModalVideo = () => {
    setIsOpenVideo(false)
    setUrl("");
  }

  return (
    <div className="PMEdit">
      <Modal isOpen={props.isOpen} contentLabel="Example Modal">
        <div className="PMEdit-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="PMEdit-content">
          {/* title */}
          <div className="title">
            <h4>Chỉnh sửa khóa học</h4>
            <div className="action-button">
              <button onClick={onDelete}>xóa</button>
              <button onClick={onUpdate}>cập nhật</button>
              <button
                onClick={openLession}
                style={{ backgroundColor: "#F4A261" }}
              >
                Thêm bài học
              </button>
            </div>
          </div>

          {/* content modal */}
          <div className="create-container">
            <div className="create-form">
              <div className="create-content">
                <div className="image-upload-container">
                  {/* <div className="input-file">
                    <input type="file" onChange={handleFileChange} />
                  </div> */}
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
                <div className="fields-group">
                  <div className="field-input ">
                    <p>
                      Tên khóa học<span>*</span>
                    </p>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      value={productData.name}
                    />
                  </div>
                  <div className="field-input ">
                    <p>
                      Danh mục <span>*</span>
                    </p>
                    <div>
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
                  <div className="field-input ">
                    <p>
                      Giá khóa học <span>*</span>
                    </p>
                    <input
                      type="number"
                      min={0}
                      name="price"
                      style={{ height: "38px" }}
                      onChange={handleInputChange}
                      value={productData.price}
                    />
                  </div>
                </div>
              </div>
              <div
                className="field-input"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <p>Mô tả ngắn về khóa học</p>
                <textarea
                  rows={10}
                  name="shortDesc"
                  onChange={handleInputChange}
                  value={productData.shortDesc}
                />
              </div>
            </div>
            {productData.lessions ? (
              <div className="lession-list">
                <h3>Danh sách bài học</h3>
                {productData.lessions.map((lession) => {
                  return (
                    <div className="lession-item">
                      <div className="name">{lession.name}</div>
                      <i class="bi bi-play-circle-fill" onClick={() => onPlay(lession.video)}></i>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>

      <div className="CourseManagement-lession-container">
        <LMCreate
          isOpen={isLession}
          onRequestClose={closeModalLession}
          product={props.data}
        ></LMCreate>
      </div>

      <div className="CourseManagement-video-container">
        <VideoPlayer isOpen={isOpenVideo} url={url}  onRequestClose={closeModalVideo}/>
      </div>

      <Loading isLoading={isLoading} />
    </div>
  );
};

export default PMEdit;
