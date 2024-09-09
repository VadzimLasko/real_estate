import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Tooltip } from "antd";
import {
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useGetOneAdQuery, useDeleteAdMutation } from "@/api/adApiSlice";
import {
  useGetUsersQuery,
  useUpdateFavoritesMutation,
} from "@/api/authApiSlice";
import { useTypedSelector } from "@/store";
import Spinner from "@/components/spinner/Spinner";
import Slider from "@/components/slider/Slider";
import { currentUserFromId, firstLetterBig } from "@/helpers";
import { Ad } from "@/types/ads";
import MapComponent from "@/components/mapComponent/MapComponent";

import "./adPage.sass";

const AdPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [updateFavorites] = useUpdateFavoritesMutation();
  const [deleteAd] = useDeleteAdMutation();
  const { currentUser } = useTypedSelector((state) => state.user);
  const { data: ad, isFetching } = useGetOneAdQuery(slug ?? "");
  const { data: users = [] } = useGetUsersQuery();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  useEffect(() => {
    if (ad && currentUser) {
      setIsFavorited(currentUser.favorites.includes(ad.id));
      setIsAuthor(ad.author === currentUser.id);
    }
  }, [ad, currentUser]);

  const like = async () => {
    if (ad && currentUser) {
      const updatedFavorites = [...currentUser.favorites, ad.id];

      await updateFavorites({
        id: currentUser.id,
        favorites: updatedFavorites,
      });
      setIsFavorited(true);
    }
  };

  const dislike = async () => {
    if (ad && currentUser) {
      const updatedFavorites = currentUser.favorites.filter(
        (id: string) => id !== ad.id
      );
      await updateFavorites({
        id: currentUser.id,
        favorites: updatedFavorites,
      });
      setIsFavorited(false);
    }
  };

  const handleDeleteAd = async () => {
    if (ad && isAuthor) {
      await deleteAd(ad.id);
      navigate("/");
    }
  };

  const renderFavorites = () => (
    <>
      <Tooltip
        title={isFavorited ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {isFavorited ? (
          <HeartFilled onClick={dislike} className="heart-favorites filled" />
        ) : (
          <HeartOutlined onClick={like} className="heart-favorites outlined" />
        )}
      </Tooltip>
      <br />

      {isAuthor && (
        <>
          <Link to={`/ad/${slug}/edit`}>
            <Button size="small" className="btn-group link-edit">
              <EditOutlined /> Редактировать
            </Button>
          </Link>
          <br />
          <Button
            size="small"
            onClick={handleDeleteAd}
            className="btn-group link-delete"
          >
            <DeleteOutlined /> Удалить
          </Button>
        </>
      )}
    </>
  );

  const srcForImg = (
    ad?.photos.map((photo) => photo.originalFileUrl) || []
  ).filter((val): val is string => !!val);

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
    if (!ad) return null;

    const adAuthor = currentUserFromId(users, ad.author);
    const gender = adAuthor ? adAuthor.gender : "Информации об авторе нет";
    return (
      <>
        <Slider photos={srcForImg} />
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

              <div className="left__right">
                <div className="title">{rooms}-комнатная квартира</div>
                <div className="favorites">
                  {currentUser && renderFavorites()}
                </div>
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
