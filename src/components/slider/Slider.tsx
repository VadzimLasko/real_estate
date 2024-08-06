import { FC, useRef, useState } from "react";
import { Carousel } from "antd";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import "./slider.sass";

const Slider: FC<{ photos: string[] }> = ({ photos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);
  const modalCarouselRef = useRef<any>(null);

  const handleImageClick = (photo: string, index: number) => {
    setActivePhoto(photo);
    setCurrentSlide(index);
    setIsModalOpen(true);
    disablePageScroll();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    enablePageScroll();
  };

  const handleBeforeChange = (from: number, to: number) => {
    setCurrentSlide(to);
    setActivePhoto(photos[to]);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setActivePhoto(photos[index]);
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
    if (modalCarouselRef.current) {
      modalCarouselRef.current.goTo(index);
    }
  };

  return (
    <>
      <Carousel
        ref={carouselRef}
        arrows
        effect="fade"
        infinite={false}
        beforeChange={handleBeforeChange}
        dots={false}
        initialSlide={currentSlide}
        className={isModalOpen ? "ant-c" : ""}
      >
        {photos.map((photo, index) => (
          <div key={index}>
            <h3 className="h-style">
              <img
                src={photo}
                alt="img"
                className="img-style"
                onClick={() => handleImageClick(photo, index)}
              />
            </h3>
          </div>
        ))}
      </Carousel>
      <div className="custom-dots">
        <div className="dots-container">
          {photos.map((photo, index) => (
            <img
              key={index}
              onClick={() => goToSlide(index)}
              src={photo}
              alt={`thumbnail-${index}`}
              className={`dot-img ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => handleCloseModal()}>
          <Carousel
            ref={modalCarouselRef}
            arrows
            effect="fade"
            infinite={false}
            beforeChange={handleBeforeChange}
            dots={false}
          >
            {<img src={activePhoto} alt="modal-img" className="modal-img" />}
          </Carousel>
        </div>
      )}
    </>
  );
};
export default Slider;
