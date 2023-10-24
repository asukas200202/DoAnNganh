import React, { useEffect, useState } from "react";
import categoryAPI from "../../../../api/category";
import { useNavigate } from 'react-router-dom';



import "./MenuDrop.css";

const MenuDrop = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cateList, setCateList] = useState([]);
  const [cateSelected, setCateSelected] = useState("");
  const navigate = useNavigate();
  const { category } = props;
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const createHoverElement = (eClass) => {
    const dropdownButton = document.querySelector(eClass);
    dropdownButton.addEventListener("mouseenter", handleMouseEnter);
    dropdownButton.addEventListener("mouseleave", handleMouseLeave);
  }

  const deleteHoverElement = (eClass) => {
    const dropdownButton = document.querySelector(eClass);
    dropdownButton.removeEventListener("mouseenter", handleMouseEnter);
    dropdownButton.removeEventListener("mouseleave", handleMouseLeave);
  }

  const getDataCategory = () => {
    categoryAPI.get({})
    .then(response => {
      if(response.status === true) {
        setCateList(response.data)
      }  
    })
  }

  const handleRedirect = (route, slug) => {
    navigate(`/${route}/${slug}`)
  }
  
   
  useEffect(() => {
    createHoverElement(".MenuDrop")
    getDataCategory()
    setCateSelected(category)
    return () => {
      deleteHoverElement(".MenuDrop")
    };
  }, [category]);


  return (
    <div className="MenuDrop">
      <div className="dropdown-button">
        <p>Danh mục</p>
        <i className="bi bi-chevron-down"></i>
      </div>
      {isOpen && (
        <div className="dropdown-container">
          <div className="dropdown-title">
            <h2>Danh mục</h2>
          </div>
          <div className="category-list">
            {
              cateList.map(cate => {
                return  <div className={`category-item ${cateSelected === cate.alias ? 'selected': ''}`} key={cate._id} onClick={() => handleRedirect('khoa-hoc', cate.alias)}>{cate.name}</div>
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDrop;
