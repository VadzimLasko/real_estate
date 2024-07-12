import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "@/components/appHeader/AppHeader";
import Footer from "@/components/footer/Footer";

import routes from "@/routes";
// import Skeleton from "@mui/material/Skeleton";
import Spinner from "@/components/spinner/Spinner";

import "@/components/app/app.sass";
import MainMenuPanel from "../mainMenuPanel/MainMenuPanel";

interface RouteConfig {
  path: string;
  element: React.ElementType;
}
//TODO разобраться с ЭппХеад чтобы при переключениях не пропадал
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AppHeader />
        <MainMenuPanel>
          <Routes>
            {routes.map(({ path, element }: RouteConfig) => (
              <Route
                key={path}
                path={path}
                element={React.createElement(element)}
              />
            ))}
          </Routes>
        </MainMenuPanel>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
