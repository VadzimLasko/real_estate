import { useState } from "react";
import { YMaps, Map as YMap, ZoomControl } from "@pbe/react-yandex-maps";
import Spinner from "../spinner/Spinner";

import "./map.sass";

const MapComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    alert("Произошла ошибка при загрузке карты");
  };

  return (
    <YMaps>
      {!isLoaded ? <Spinner /> : null}
      <div className="map">
        <YMap
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
          }}
          defaultState={{
            center: [53.9, 27.55],
            zoom: 11,
          }}
        >
          <ZoomControl options={{ float: "right" }} />
        </YMap>
      </div>
    </YMaps>
  );
};

export default MapComponent;
