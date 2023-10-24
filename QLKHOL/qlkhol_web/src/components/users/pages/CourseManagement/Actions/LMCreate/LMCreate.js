import React, { useState } from "react";
import Modal from "react-modal";
import "./LMCreate.css";
import Loading from "../../../../commons/Loading/Loading";
import LessionAPI from "../../../../../../api/lession";
import ProductAPI from "../../../../../../api/product";
import UploadAPI from "../../../../../../api/upload";

const LMCreate = (props) => {
  const [lessionData, setLessionData] = useState({
    name: "",
    description: "",
    video: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onCloseModal = () => {
    props.onRequestClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLessionData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onCreate = async () => {
    setIsLoading(true);
    try {
      lessionData.video = await handleFileUpload();
      LessionAPI.create(lessionData).then((response) => {
        if (response.status) {
          var newLession = response.data.data;
          var productData = props.product;

          productData.lessions.push(newLession._id);

          ProductAPI.update(productData).then((response) => {
            if (response.status === true) {
              setIsLoading(false);
              onCloseModal();
            }
          });
          setIsLoading(false);
          onCloseModal();
        }
      });
    } catch(error) {
        console.log(error)
    }
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
        const response = await UploadAPI.uploadVideo(selectedFile);
        if (response.status) {

          return response.data.url;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  };

  return (
    <div className="LMCreate">
      <Modal
        isOpen={props.isOpen}
        contentLabel="Example Modal"
        id="LMCreate-modal"
      >
        <div className="PMCreate-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <div className="PMCreate-content">
          <div className="title">
            <h4>Tạo bài học mới</h4>
          </div>
          <div className="create-container">
            <div className="create-form">
              <div className="save-button">
                <button onClick={onCreate}>Lưu bài học</button>
              </div>
              <div className="field-input p-col-1">
                <p>
                  Tên bài học<span>*</span>
                </p>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="field-input p-col-1">
                <p>Nội dung bài học</p>
                <textarea
                  rows={5}
                  name="description"
                  onChange={(e) => handleInputChange(e)}
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
                  {/* <img
                    src={
                      imageSelected
                        ? imageSelected
                        : "https://www.sodapdf.com/blog/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png"
                    }
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Loading isLoading={isLoading} />
    </div>
  );
};

export default LMCreate;
