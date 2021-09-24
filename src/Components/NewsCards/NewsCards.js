/** @format */

import React, { useContext } from "react";
import { ArticlesContext } from "../../ArticlesContext/ArticlesContext";
import Card from "./Card/Card";
import "./NewsCards.scss";

const NewsCard = (props) => {
  const {
    articles,

    selectedSection,
  } = useContext(ArticlesContext);
  return (
    <div className='newsCardsContainer'>
      {articles.map((article) => {
        return selectedSection.length ? (
          article.section === selectedSection ? (
            <Card article={article} />
          ) : null
        ) : (
          <Card article={article} />
        );
      })}
    </div>
  );
};
export default NewsCard;
