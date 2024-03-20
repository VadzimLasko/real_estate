import AppHeader from "../appHeader/AppHeader";
import MainMenuPanel from "../mainMenuPanel/MainMenuPanel";
import Footer from "../footer/Footer";
import Skeleton from "@mui/material/Skeleton";
import AddPhoto from "../forms/formElements/AddPhoto";
import AddAdForm from "../forms/addAdForm/AddAdForm";
import LoginForm from "../forms/loginForm/LoginForm";
import RegistrationForm from "../forms/registrationForm/RegistrationForm";
import MapComponent from "../map/Map";
import { ConfigProvider } from "antd";
import "./app.sass";

const App = () => {
  return (
    <>
      <AppHeader />
      <MainMenuPanel>
        {/* <AddAdForm />  */}
        {/* <LoginForm />  */}
        {/* <RegistrationForm /> */}
        <MapComponent />
      </MainMenuPanel>
      <Footer />
    </>
  );
};

export default App;
