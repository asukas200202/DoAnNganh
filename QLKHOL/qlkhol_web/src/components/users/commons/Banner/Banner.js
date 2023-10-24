import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Banner.css";

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="Banner">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src="https://cdn2.topica.vn/b92eed95-8a0f-4ba6-bc37-aaa9205437f5/product/63b68ce8d45fde00262e81cd"
            alt="img"
          ></img>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://cdn2.topica.vn/b92eed95-8a0f-4ba6-bc37-aaa9205437f5/product/63898019af47c60040e48ea7"
            alt="img"
          ></img>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://cdn2.topica.vn/b92eed95-8a0f-4ba6-bc37-aaa9205437f5/product/63898019af47c60040e48ea7"
            alt="img"
          ></img>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;
