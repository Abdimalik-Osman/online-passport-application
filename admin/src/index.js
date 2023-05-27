import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { configureStore } from "./store";
import AppProvider from "./Components/Context/loginContext/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configureStore({})}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

