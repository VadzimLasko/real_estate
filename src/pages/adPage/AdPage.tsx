import React, { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "antd";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useGetOneAdQuery } from "@/api/adApiSlice";
import { useUpdateFavoritesMutation } from "@/api/authApiSlice";
import Spinner from "@/components/spinner/Spinner";
import "./adPage.sass";
import { AnyObject } from "antd/es/_util/type";
import { Ad } from "@/types/ads";
import MapComponent from "@/components/mapComponent/MapComponent";

const App: FC<{ photos: string[] }> = ({ photos }) => {
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

const AdPage: React.FC = () => {
  const { slug } = useParams();
  const [updateFavorites] = useUpdateFavoritesMutation();
  // TODO: добавь фаворитов
  const { data: ad, isFetching } = useGetOneAdQuery(slug ?? "");

  const srcForImg = ad ? ad.photos.map((photo) => photo.originalFileUrl) : null;

  const objectToDivList = (obj: AnyObject) => {
    if (!obj) return null;

    const objectEntries = Object.entries(obj);

    return (
      <ul>
        <App photos={srcForImg} />
        {objectEntries.map(([key, value]) =>
          key === "photos" ? null : (
            <li key={key}>
              {key} - {value}
            </li>
          )
        )}
      </ul>
    );
  };

  const render = ({
    title,
    address,
    price,
    description,
    square,
    rooms,
    floor,
    name,
    phone,
    author,
    coordinates,
  }: Ad) => {
    return (
      <>
        <App photos={srcForImg} />
        <div className="ad">
          <div className="title-hr"></div>
          <div className="ad__main">
            <div className="ad__main__left">
              <div className="left__left">
                {price}$<div>{square}м2</div>
                <div>{floor}этаж</div>
              </div>
              <div className="left__right">{rooms}-комнатная квартира</div>
              <div className="left__main">
                <div>{description}</div>
                <div>{address}</div>
              </div>
            </div>
            <div className="ad__main__right">
              <span>Частное лицо</span>
              <br />
              <span>{name}</span>
              <br />
              <span>{phone}</span>
              <br />
            </div>
          </div>
        </div>

        <div className="map__ad-list">
          <MapComponent initialCoordinates={coordinates} />
        </div>
      </>
    );
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (ad) {
    return render(ad);
  } else {
    return null;
  }
};

export default AdPage;
