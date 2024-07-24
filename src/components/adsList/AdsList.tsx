import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useGetAdsQuery } from "@/api/adApiSlice";
import { useTypedSelector } from "@/store";
import MapComponent from "../mapComponent/MapComponent";
import Spinner from "@/components/spinner/Spinner";
import { Ad } from "@/types/ads";
import { DataForPoints } from "@/types/map";

import home from "../../img/home.jpg";
import "./adsList.sass";

const AdsList: FC = () => {
  const { data: ads, isFetching } = useGetAdsQuery();
  const [selected, setSelected] = useState<string>("");
  const { priceRange, rooms, squareRange, floor } = useTypedSelector(
    (state) => state.filter
  );

  const selectedAd = (value: string) => {
    setSelected(value);
  };

  const filteredAds = useMemo(() => {
    if (ads) {
      let filteredAds = ads.slice();
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
  }, [ads, priceRange, rooms, squareRange, floor]);

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
          {filteredAds.map(
            ({ id, price, address, rooms, floor, square, photos }: Ad) => {
              return (
                <Link
                  to={`/ad/${id}`}
                  className={`ad-cart ${selected === id ? "extra" : ""}`}
                  key={id}
                >
                  <div className="ad-cart__photo">
                    <img
                      src={photos[0].thumbUrl ? photos[0].thumbUrl : home}
                      alt="img"
                    />
                    <span className="ad-cart__photo_price">{price}</span>
                  </div>
                  <div className="ad-cart__description">
                    <span className="ad-cart__description_rooms">{rooms}</span>
                    <span className="ad-cart__description_square">
                      {square}
                    </span>
                    <span className="ad-cart__description_floor">{floor}</span>
                    <div>
                      <span className="ad-cart__description_address">
                        {address}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    );
  };
  if (isFetching || !ads) {
    return <Spinner />;
  }

  if (ads) {
    return renderAds(filteredAds, dataForPoints);
  }
};

export default AdsList;
