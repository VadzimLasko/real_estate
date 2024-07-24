import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/components/app/App";
import store from "@/store";

import { ConfigProvider, ThemeConfig } from "antd";

import "normalize.css";
import "@/styles/style.sass";

interface CustomThemeConfig {
  token: {
    fontSize: string | number;
    [key: string]: any;
  };
}

const config: CustomThemeConfig = {
  token: {
    fontSize: 14,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={config as ThemeConfig}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
