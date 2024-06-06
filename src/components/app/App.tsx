import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "@/components/appHeader/AppHeader";
import Footer from "@/components/footer/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import routes from "@/routes/index";
// import Skeleton from "@mui/material/Skeleton";
import Spinner from "@/components/spinner/Spinner";
// import AddPhoto from "../forms/formElements/AddPhoto";
// import AddAdForm from "../forms/addAdForm/AddAdForm";
// import LoginForm from "../forms/loginForm/LoginForm";
// import RegistrationForm from "../forms/registrationForm/RegistrationForm";
// import MapComponent from "../map/Map";
// import { selectAll, fetchAds } from "../adsList/adsSlice";
// import { ConfigProvider } from "antd";
import "@/components/app/app.sass";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AppHeader />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
