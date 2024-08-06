import { FC, useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useGetAdsQuery } from "@/api/adApiSlice";
import { useTypedSelector } from "@/store";
import MapComponent from "../mapComponent/MapComponent";
import InfoMessage from "@/components/infoMessage/InfoMessage";
import Spinner from "@/components/spinner/Spinner";
import { Ad } from "@/types/ads";
import { DataForPoints } from "@/types/map";

import home from "../../img/home.jpg";
import "./adsList.sass";

const AdsList: FC = () => {
  let location = useLocation();
  const { data: ads, isFetching } = useGetAdsQuery();
  const [selected, setSelected] = useState<string>("");
  const [adsForRender, setAdsForRender] = useState<Ad[]>(ads || []);
  const { priceRange, rooms, squareRange, floor } = useTypedSelector(
    (state) => state.filter
  );
  const { currentUser } = useTypedSelector((state) => state.user);

  const param = location.pathname.split("/").at(-1);
  console.log("adsForRender", adsForRender);

  useEffect(() => {
    if (ads && currentUser) {
      if (param === "favorites") {
        setAdsForRender(
          ads.filter((ad) => currentUser.favorites.includes(ad.id))
        );
      } else if (param === "created") {
        setAdsForRender(ads.filter((ad) => ad.author === currentUser.id));
      } else {
        setAdsForRender(ads);
      }
    }
  }, [ads, location]);

  const selectedAd = (value: string) => {
    setSelected(value);
  };

  const filteredAds = useMemo(() => {
    if (ads) {
      let filteredAds = adsForRender.slice();
      let filteredRooms = rooms.slice();
      let filteredAdsWith4: null | Ad[] = null;

      if (priceRange !== null) {
        filteredAds = filteredAds.filter(
          (ad) => ad.price >= priceRange[0] && ad.price <= priceRange[1]
        );
      }

      if (squareRange !== null) {
        filteredAds = filteredAds.filter(
          (ad) => ad.square >= squareRange[0] && ad.square <= squareRange[1]
        );
      }

      if (filteredRooms.length > 0) {
        if (filteredRooms.includes("4+")) {
          filteredRooms = filteredRooms.filter((room) => room !== "4+");
          filteredAdsWith4 = filteredAds.filter((ad) => ad.rooms >= 4);
        }
        const filteredAdsWithout4 = filteredAds.filter((ad) =>
          filteredRooms.includes(String(ad.rooms))
        );

        filteredAds = filteredAdsWith4
          ? filteredAdsWithout4.concat(filteredAdsWith4)
          : filteredAdsWithout4;
      }

      if (floor) {
        filteredAds = filteredAds.filter((ad) => ad.floor !== 1);
      }

      return filteredAds;
    }
    return [];
  }, [ads, priceRange, rooms, squareRange, floor, adsForRender]);

  const dataForPoints = useMemo(() => {
    return filteredAds.map(({ id, coordinates }: DataForPoints) => ({
      id,
      coordinates,
    }));
  }, [filteredAds]);

  const renderAds = (filteredAds: Ad[], dataForPoints: DataForPoints[]) => {
    return (
      <div className="ads-list">
        <div className="map__ads-list">
          <MapComponent selectedAd={selectedAd} dataForPoints={dataForPoints} />
        </div>
        <div className="ads-list__right">
          <TransitionGroup component={null}>
            {filteredAds.map(
              ({ id, price, address, rooms, floor, square, photos }: Ad) => {
                return (
                  <CSSTransition key={id} timeout={500} classNames="adItem">
                    <Link
                      to={`/ad/${id}`}
                      className={`ad-card ${selected === id ? "extra" : ""}`}
                      key={id}
                    >
                      <div className="ad-card__photo">
                        <img
                          className="img"
                          src={photos[0].thumbUrl ? photos[0].thumbUrl : home}
                          alt="img"
                        />
                        <span className="ad-card__photo_price">{price} $</span>
                      </div>
                      <div className="ad-card__description">
                        <span className="ad-card__description_rooms">
                          {rooms} к
                        </span>
                        <span className="ad-card__description_square">
                          {square} м<sup>2</sup>
                        </span>
                        <span className="ad-card__description_floor">
                          {floor} эт.
                        </span>
                        <div>
                          <span className="ad-card__description_address">
                            {address}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CSSTransition>
                );
              }
            )}
          </TransitionGroup>
        </div>
      </div>
    );
  };
  if (isFetching || !ads) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <InfoMessage>Вам нужно авторизоваться</InfoMessage>;
  }

  if (ads) {
    return renderAds(filteredAds, dataForPoints);
  }
};

export default AdsList;
