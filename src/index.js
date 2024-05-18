import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store";
import App from "./components/app/App";

import "normalize.css";
import "./styles/style.sass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>
);
