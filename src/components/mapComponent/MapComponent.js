import { useState, useRef } from "react";
import {
  YMaps,
  Map as YMap,
  ZoomControl,
  GeolocationControl,
  Placemark,
  ObjectManager,
  Clusterer,
  SearchControl,
  useYMaps,
} from "@pbe/react-yandex-maps";
import Spinner from "../spinner/Spinner";

import "./mapComponent.sass";
//Todo разобраться с АПИ для карт
const MapComponent = ({ onChangeCoordinates, initialCoordinates = [] }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [coordinate, setCoordinate] = useState(initialCoordinates);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    alert("Произошла ошибка при загрузке карты");
    setIsLoaded(true);
  };

  const handleClick = (event) => {
    const coords = event.get("coords");
    setCoordinate(() => coords);
    onChangeCoordinates(coords);
  };

  return (
    <div className="map">
      {!isLoaded ? <Spinner /> : null}
      <YMaps>
        <YMap
          onLoad={handleLoad}
          onError={handleError}
          onClick={handleClick}
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
          {/* <SearchControl options={{ float: "right" }} /> */}
        </YMap>
      </YMaps>
    </div>
  );
};

export default MapComponent;
