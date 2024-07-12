import { FC, useState } from "react";
import "./adsList.sass";
import MapComponent from "../mapComponent/MapComponent";
import { useGetAdsQuery } from "@/api/adApiSlice";
import Spinner from "@/components/spinner/Spinner";
import { Ad } from "@/types/ads";
import home from "../../img/home.jpg";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import { Link } from "react-router-dom";
import { DataForPoints } from "@/types/map";

const AdsList: FC = () => {
  const { data: ads, isFetching } = useGetAdsQuery();
  const [selected, setSelected] = useState("");

  const selectedAd = (value: string) => {
    setSelected(value);
  };
  // console.log("selected in AdList", selected);

  if (isFetching) {
    return <Spinner />;
  }
  // console.log(ads);

  if (ads) {
    const dataForPoints = ads.map(({ id, coordinates }: DataForPoints) => {
      return { id, coordinates };
    });
    // console.log("dataForPoints", dataForPoints);
    return (
      <div className="ads-list">
        <MapComponent selectedAd={selectedAd} dataForPoints={dataForPoints} />

        <div className="ads-list__right">
          {ads!.map(
            ({
              id,
              price,
              address,
              rooms,
              floor,
              square,
              photos,
              coordinates,
            }: Ad) => {
              // photos[0].thumbUrl ? photos[0].thumbUrl :
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
  }
  if (!ads) {
    return <NotFoundPage />;
  }

  //   if (!ads) {
  //     return null;
  //   } // Возвращает null, если ads нет
};

export default AdsList;

// JSON data and other code sections are left unchanged as comments
