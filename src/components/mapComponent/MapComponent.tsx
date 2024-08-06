import { FC, useState } from "react";
import {
  YMaps,
  Map as YMap,
  ZoomControl,
  GeolocationControl,
  Placemark,
  ObjectManager,
  Clusterer,
  // SearchControl,
  // useYMaps,
} from "@pbe/react-yandex-maps";

import Spinner from "../spinner/Spinner";
import { MapComponentProps } from "@/types/map";

import "./mapComponent.sass";

//TODO разобраться с АПИ для карт
//TODO удали лишние консоль логи и коментарии
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
            filter={(object: { id: number }) => object.id % 2 === 0}
            // defaultFeatures={objectManagerFeatures}
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
          {/* <SearchControl options={{ float: "right" }} /> */}
        </YMap>
      </YMaps>
    </>
  );
};

export default MapComponent;

// import { useState } from "react";
// import {
//   YMaps,
//   Map as YMap,
//   ZoomControl,
//   GeolocationControl,
//   Placemark,
//   ObjectManager,
//   Clusterer,
// } from "@pbe/react-yandex-maps";
// import Spinner from "../spinner/Spinner";
// import type { MapClickEvent } from "@pbe/react-yandex-maps"; // Assuming there is a type for Map click event

// import "./mapComponent.sass";

// interface MapComponentProps {
//   onChangeCoordinates: (coords: number[]) => void;
//   initialCoordinates?: number[]; // про
// }

// const MapComponent: React.FC<MapComponentProps> = ({
//   onChangeCoordinates,
//   initialCoordinates = [],
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [coordinate, setCoordinate] = useState<number[]>(initialCoordinates);

//   const handleLoad = () => {
//     setIsLoaded(true);
//   };

//   const handleError = () => {
//     alert("Произошла ошибка при загрузке карты");
//     setIsLoaded(true);
//   };

//   const handleClick = (event: MapClickEvent) => {
//     const coords: number[] = event.get("coords");
//     setCoordinate(() => coords);
//     onChangeCoordinates(coords);
//   };

//   return (
//     <div className="map">
//       {!isLoaded && <Spinner />}
//       <YMaps>
//         <YMap
//           onLoad={handleLoad}
//           onError={handleError}
//           onClick={handleClick}
//           width={isLoaded ? "100%" : "0"}
//           height="100%"
//           defaultState={{
//             center: [53.9, 27.55],
//             zoom: 11,
//           }}
//         >
//           <Clusterer
//             options={{
//               preset: "islands#invertedVioletClusterIcons",
//               groupByCoordinates: false,
//             }}
//           >
//             {/* Uncomment and supply clusterPoints array if needed */}
//             {/* {clusterPoints.map((coordinates, index) => (
//               <Placemark key={index} geometry={coordinates} />
//             ))} */}
//           </Clusterer>
//           <ObjectManager
//             options={{
//               clusterize: true,
//               gridSize: 32,
//             }}
//             objects={{
//               openBalloonOnClick: true,
//               preset: "islands#greenDotIcon",
//             }}
//             clusters={{
//               preset: "islands#redClusterIcons",
//             }}
//             filter={(object: { id: number }) => object.id % 2 === 0}
//             // Uncomment and supply objectManagerFeatures array if needed
//             // defaultFeatures={objectManagerFeatures}
//             modules={[
//               "objectManager.addon.objectsBalloon",
//               "objectManager.addon.objectsHint",
//             ]}
//           />
//           <ZoomControl options={{ float: "right" }} />
//           <GeolocationControl options={{ float: "left" }} />
//           <Placemark geometry={coordinate} />
//           {/* Uncomment and include SearchControl if needed */}
//           {/* <SearchControl options={{ float: "right" }} /> */}
//         </YMap>
//       </YMaps>
//     </div>
//   );
// };

// export default MapComponent;
