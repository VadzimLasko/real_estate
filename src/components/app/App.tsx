import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "@/components/appHeader/AppHeader";
import Footer from "@/components/footer/Footer";
import routes from "@/routes";
import Spinner from "@/components/spinner/Spinner";

interface RouteConfig {
  path: string;
  element: React.ElementType;
}

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AppHeader />
        <Routes>
          {routes.map(({ path, element }: RouteConfig) => (
            <Route
              key={path}
              path={path}
              element={React.createElement(element)}
            />
          ))}
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
