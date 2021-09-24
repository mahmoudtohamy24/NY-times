/** @format */

import React, { useEffect, useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
  ArticlesContext,
  ArticlesList,
} from "./ArticlesContext/ArticlesContext";
import HomePage from "./Container/HomePage/HomePage";
import ArticlesActions from "./Actions/ArticlesActions";
import "antd/dist/antd.css";
import Loader from "./Components/Loader/Loader";
import Article from "./Container/Article/Article";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  const {
    setArticles,

    setSections,
    setErrorMsg,
    toggleLoading,
    article,
  } = useContext(ArticlesContext);
  useEffect(async () => {
    // Here when the website run i get the latest articles and then save it in the context
    toggleLoading(true);
    let result = await ArticlesActions.getLatestArticles();
    if (result === "Something went wrong please try again") {
      setErrorMsg(result);
    } else {
      setSections(result.articlesSections);
      setArticles(result.articles);
    }

    toggleLoading(false);
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/article'>
            <Article article={article} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
