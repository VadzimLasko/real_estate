import AppHeader from "../appHeader/AppHeader";
import MainMenuPanel from "../mainMenuPanel/MainMenuPanel";
import Footer from "../footer/Footer";
import Skeleton from "@mui/material/Skeleton";
import AddPhoto from "../forms/formElements/AddPhoto";
import AddAdForm, {
  validateMessages,
  theme,
} from "../forms/addAdForm/AddAdForm";
import { ConfigProvider } from "antd";
import "./app.sass";

const App = () => {
  return (
    <>
      <AppHeader />
      <MainMenuPanel />
      <ConfigProvider form={{ validateMessages }}>
        <AddAdForm />
      </ConfigProvider>
      <Footer />
    </>
  );
};

export default App;
