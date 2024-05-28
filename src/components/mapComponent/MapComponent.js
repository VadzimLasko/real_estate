import { useState } from "react";
import {
  YMaps,
  Map as YMap,
  ZoomControl,
  GeolocationControl,
  Placemark,
  ObjectManager,
  Clusterer,
  SearchControl,
} from "@pbe/react-yandex-maps";
import Spinner from "../spinner/Spinner";

import "./mapComponent.sass";

const MapComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [coordinate, setCoordinate] = useState([53.9, 27.55]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    alert("Произошла ошибка при загрузке карты");
    setIsLoaded(true);
  };

  const handlClick = (event) => {
    const coords = event.get("coords");
    setCoordinate(() => coords);
  };

  return (
    <div className="map">
      {!isLoaded ? <Spinner /> : null}
      <YMaps>
        <YMap
          onLoad={handleLoad}
          onError={handleError}
          onClick={handlClick}
          width={isLoaded ? "100%" : "0"}
          height="100%"
          defaultState={{
            center: [53.9, 27.55],
            zoom: 11,
          }}
        >
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {/* {clusterPoints.map((coordinates, index) => (
              <Placemark key={index} geometry={coordinates} />
            ))} */}
          </Clusterer>
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              openBalloonOnClick: true,
              preset: "islands#greenDotIcon",
            }}
            clusters={{
              preset: "islands#redClusterIcons",
            }}
            filter={(object) => object.id % 2 === 0}
            // defaultFeatures={objectManagerFeatures}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.objectsHint",
            ]}
          />
          <ZoomControl options={{ float: "right" }} />
          <GeolocationControl options={{ float: "left" }} />
          <Placemark geometry={coordinate} />
          <SearchControl options={{ float: "right" }} />
        </YMap>
      </YMaps>
    </div>
  );
};

export default MapComponent;
