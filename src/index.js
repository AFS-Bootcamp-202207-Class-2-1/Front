import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/less/basic.less";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import store from './stores/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
