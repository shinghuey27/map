import "./index.css";

import Store from "./redux/Store";
import App from "./App";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { fetchMaps } from "./redux/MapsSlice";
import { fetchReviews} from "./redux/ReviewsSlice";

Store.dispatch(fetchMaps())
Store.dispatch(fetchReviews())

ReactDOM.render(
    <Provider store={Store}>
      <App />
      </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
