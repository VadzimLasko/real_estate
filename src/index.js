import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";

import store from "./store";
import { Provider } from "react-redux";

import App from "./components/app/App";
import Spinner from "./components/spinner/Spinner";
import "normalize.css";
import "./styles/style.sass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Suspense>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>
);
