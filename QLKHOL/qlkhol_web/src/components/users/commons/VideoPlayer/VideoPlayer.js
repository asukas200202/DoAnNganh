import React from "react";
import Modal from "react-modal";
import "./VideoPlayer.css";

const VideoPlayer = (props) => {
  const onCloseModal = () => {
    props.onRequestClose();
  };

  return (
    <div className="VideoPlayer">
      <Modal
        isOpen={props.isOpen}
        contentLabel="Example Modal"
        id="video-modal"
      >
        <div className="video-close" onClick={() => onCloseModal()}>
          <i className="bi bi-x-lg"></i>
        </div>
        <video controls>
          <source src={props.url} type="video/mp4" />
          {/* Thêm các nguồn video khác (nếu có) */}
        </video>
      </Modal>
    </div>
  );
};

export default VideoPlayer;
