import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "@/components/appHeader/AppHeader";
import Footer from "@/components/footer/Footer";
import routes from "@/routes";
import { GeneralSpinner } from "@/components/spinner/Spinner";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary";

interface RouteConfig {
  path: string;
  element: React.ElementType;
}

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Suspense fallback={<GeneralSpinner />}>
        <ErrorBoundary>
          <Routes>
            {routes.map(({ path, element }: RouteConfig) => (
              <Route
                key={path}
                path={path}
                element={React.createElement(element)}
              />
            ))}
          </Routes>
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
