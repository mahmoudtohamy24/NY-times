/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ArticlesList } from "./ArticlesContext/ArticlesContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
ReactDOM.render(
  <ArticlesList>
    <Router>
      <App />
    </Router>
  </ArticlesList>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
