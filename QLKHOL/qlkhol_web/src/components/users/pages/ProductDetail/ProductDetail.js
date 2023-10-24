import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ProductAPI from "../../../../api/product";
import "./ProductDetail.css";
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../../../context/DataContext';



const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const product = location.state;
  const { cart, updateCart, addToCart } = useContext(DataContext);


  useEffect(() => {
  },[name])

  const convertToCurrency = (number) => {
    const formattedNumber = number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedNumber;
  };

  return (
    <div className='ProductDetail'>
        <div className='banner'>
          <img src="https://res.cloudinary.com/dbrdml9bf/image/upload/v1638449082/topica/wave_iabqmr.png" />
          <div className='title'>
            <div className='name'>{product.name}</div>
            <div className='short-desc'>
              <p>{product.shortDesc}</p>
            </div>
          </div>
        </div>
        <div className='main'>
          <div className='infomation'>
            <div className='about-course'></div>
            <div className='about-teacher'></div>
          </div>
          <div className='course-actions'>
            <div className='card-action'>
              <div className='image'>
                <img src={product.image}/>
              </div>
              <div className='price'>{convertToCurrency(product.price)}</div>
              <div className='btn-groups'>
                <div className='add-cart' onClick={() => addToCart(product)}>Thêm vào giở hàng</div>
                <div className='buy-now'>Mua ngay</div>
               
              </div>
              <div className='share'></div>
            </div>
          </div>
        </div>    
    </div>
  )
}

export default ProductDetail