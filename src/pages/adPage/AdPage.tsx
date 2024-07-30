import React, { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useGetOneAdQuery } from "@/api/adApiSlice";
import {
  useGetUsersQuery,
  useUpdateFavoritesMutation,
} from "@/api/authApiSlice";
import Spinner from "@/components/spinner/Spinner";
import { currentUserFromId, firstLetterBig } from "@/helpers";

import { Ad } from "@/types/ads";
import { User } from "@/types/users";
import MapComponent from "@/components/mapComponent/MapComponent";

import "./adPage.sass";

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
  const { data: users = [] } = useGetUsersQuery();

  let gender = "Информация об авторе отсутствует";
  if (ad && users.length > 0) {
    const currentUser = currentUserFromId(users, ad.author);
    gender = currentUser ? currentUser.gender : gender;
  }

  const srcForImg = ad ? ad.photos.map((photo) => photo.originalFileUrl) : null;

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
    coordinates,
  }: Ad) => {
    return (
      <>
        <App photos={srcForImg} />
        <div className="ad">
          <span className="title-line" />
          <div className="ad__main">
            <div className="ad__main__left">
              <div className="left__left">
                <div className="text_price title">{price} $</div>
                <div className="text__container">
                  <div className="text">
                    <div className="svg__container">
                      <div className="svg svg_square" />
                      <span>Площадь</span>
                    </div>
                    <div>{square}м2</div>
                  </div>

                  <div className="text">
                    <div className="svg__container">
                      <div className="svg svg_floor" />
                      <span>Этаж</span>
                    </div>
                    <div>{floor}</div>
                  </div>
                </div>
              </div>

              <div className="left__right title">
                {rooms}-комнатная квартира
              </div>
              <div className="left__main">
                <div className="left__main__container">
                  <div className="text_big text_bold">{title}</div>
                  <div>{description}</div>
                  <div className="text_big">{address}</div>
                </div>
              </div>
            </div>
            <div className="ad__main__right">
              <div className="title">{firstLetterBig(gender)}</div>
              <div className="text__container_right">
                <div className="text_element">{name}</div>
                <div>{phone}</div>
              </div>
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
