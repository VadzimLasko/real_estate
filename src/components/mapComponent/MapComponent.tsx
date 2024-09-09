import { FC, useState } from "react";
import {
  YMaps,
  Map as YMap,
  ZoomControl,
  GeolocationControl,
  Placemark,
  ObjectManager,
  Clusterer,
} from "@pbe/react-yandex-maps";

import Spinner from "../spinner/Spinner";
import { MapComponentProps } from "@/types/map";

import "./mapComponent.sass";

const MapComponent: FC<MapComponentProps> = ({
  onChangeCoordinates,
  initialCoordinates = [],
  dataForPoints,
  selectedAd,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [coordinate, setCoordinate] = useState<number[]>(initialCoordinates);
  const [select, setSelect] = useState("");

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    alert("Произошла ошибка при загрузке карты");
    setIsLoaded(true);
  };
  type YandexMapEvent = {
    get: (key: string) => number[];
  };

  const handleClick = (event: YandexMapEvent) => {
    if (onChangeCoordinates) {
      const coords: number[] = event.get("coords");
      setCoordinate(() => coords);
      if (onChangeCoordinates) {
        onChangeCoordinates(coords);
      }
    }
  };

  const selectedAdInMap = (id: string) => {
    setSelect(() => id);
    if (selectedAd) {
      selectedAd(id);
    }
  };

  return (
    <>
      {!isLoaded ? <Spinner /> : null}
      <YMaps>
        <YMap
          onLoad={handleLoad}
          onError={handleError}
          onClick={handleClick}
          width={isLoaded ? "100%" : "0"}
          height="100%"
          defaultState={{
            center: coordinate.length > 0 ? coordinate : [53.9, 27.55],
            zoom: 11,
          }}
        >
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
          ></Clusterer>
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
            filter={(object: { id: number }) => object.id % 2 === 0}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.objectsHint",
            ]}
          />
          <ZoomControl options={{ position: { right: 10, top: 10 } }} />
          <GeolocationControl options={{ float: "left" }} />
          {!dataForPoints ? (
            <Placemark geometry={coordinate} />
          ) : (
            dataForPoints.map(({ id, coordinates }) => {
              return (
                <Placemark
                  key={id}
                  onClick={() => selectedAdInMap(id)}
                  geometry={coordinates}
                  options={{ iconColor: id === select ? "#FF0000" : "#1E98FF" }}
                />
              );
            })
          )}
        </YMap>
      </YMaps>
    </>
  );
};

export default MapComponent;
