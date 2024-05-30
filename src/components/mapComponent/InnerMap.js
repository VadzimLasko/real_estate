// import {
//   YMaps,
//   Map as YMap,
//   ZoomControl,
//   GeolocationControl,
//   Placemark,
//   ObjectManager,
//   Clusterer,
//   SearchControl,
//   withYMaps,
//   useYMaps,
// } from "@pbe/react-yandex-maps";
// import { useState } from "react";
// const InnerMap = () => {
//   const ymaps = useYMaps();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [coordinate, setCoordinate] = useState([53.9, 27.55]);
//   const [address, setAddress] = useState("");

//   const handleClick = (event) => {
//     const coords = event.get("coords");
//     setCoordinate(() => coords);
//     ymaps.geocode(coords).then((res) => {
//       setAddress(res.geoObjects.get(0).properties.get("name"));
//     });
//   };
// width={isLoaded ? "100%" : "0"}
//   const handleLoad = () => {
//     setIsLoaded(true);
//   };

//   const handleError = () => {
//     alert("Произошла ошибка при загрузке карты");
//     setIsLoaded(true);
//   };

//   return (
//     <YMap
//       onLoad={handleLoad}
//       onError={handleError}
//       onClick={handleClick}
//       width={isLoaded ? "100%" : "0"}
//       height="100%"
//       defaultState={{
//         center: [53.9, 27.55],
//         zoom: 11,
//       }}
//       // ... the rest of your props ...
//     >
//       <Clusterer
//         options={{
//           preset: "islands#invertedVioletClusterIcons",
//           groupByCoordinates: false,
//         }}
//       >
//         {/* {clusterPoints.map((coordinates, index) => (
//               <Placemark key={index} geometry={coordinates} />
//             ))} */}
//       </Clusterer>
//       <ObjectManager
//         options={{
//           clusterize: true,
//           gridSize: 32,
//         }}
//         objects={{
//           openBalloonOnClick: true,
//           preset: "islands#greenDotIcon",
//         }}
//         clusters={{
//           preset: "islands#redClusterIcons",
//         }}
//         filter={(object) => object.id % 2 === 0}
//         // defaultFeatures={objectManagerFeatures}
//         modules={[
//           "objectManager.addon.objectsBalloon",
//           "objectManager.addon.objectsHint",
//         ]}
//       />
//       <ZoomControl options={{ float: "right" }} />
//       <GeolocationControl options={{ float: "left" }} />
//       <Placemark
//         geometry={coordinate}
//         onClick={() => {
//           alert("Вы нажали метку ");
//         }}
//         options={{
//           iconImageSize: [10, 10],
//           preset: "islands#violetCircleDotIcon",
//         }}
//       />
//       <SearchControl options={{ float: "right" }} />
//     </YMap>
//   );
// };

// export default InnerMap;
