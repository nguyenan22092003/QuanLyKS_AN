import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.scss";
import "swiper/css";
import store from "./redux/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.error = () => {};
window.onerror = () => {};
window.onunhandledrejection = () => {};
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-right" />
  </Provider>
  // </React.StrictMode>
);
