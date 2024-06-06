import { StrictMode } from "react";
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import App from '@/components/app/App'
import store from "@/store";

import "normalize.css";
import "@/styles/style.sass";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
)
