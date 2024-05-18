import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "@/components/appHeader/AppHeader";
import Footer from "@/components/footer/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import {AdPage, CreateAdPage, EditAdPage,  HomePage,  LoginPage, RegisterPage, UserProfilePage} from '@/pages/index.js';
// import Skeleton from "@mui/material/Skeleton";
import Spinner from '@/components/spinner/Spinner.js'
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
          <Route path="/ad/:slug" element={<AdPage />} />
          <Route path="/ad/create" element={<CreateAdPage />} />
          <Route path="/ad/:slug/edit" element={<EditAdPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserProfilePage />} />
        </Routes>
        <Footer/>
      </Suspense>
    </Router>
  );
};

export default App;
