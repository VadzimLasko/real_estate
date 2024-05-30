import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAdQuery } from "@/api/adApiSlice.js";

import Spinner from "@/components/spinner/Spinner.js";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

const AdPage = (props) => {
  let { slug } = useParams();
  const { data: ad, isFetching } = useGetOneAdQuery(slug);
  // const srcForImg = ad ? ad.photos[0].originalFileUrl : null;

  const objectToDivList = (object) => {
    if (!object) return null;

    const objectEntries = Object.entries(object);
    //Toto сделано только для одного фото
    const srcForImg = object.photos[0].originalFileUrl;

    return (
      <ul>
        {objectEntries.map(([key, value]) =>
          key === "photos" ? null : (
            <li key={key}>
              {key} - {value}
            </li>
          )
        )}
        {<img src={srcForImg} alt="ad" />}
      </ul>
    );
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (ad) {
    return objectToDivList(ad);
  } else {
    return null;
  }
};

export default AdPage;
