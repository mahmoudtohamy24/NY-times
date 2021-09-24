/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NoImageFount from "../../../Assets/Images/no-image-found-360x260.png";
import { ArticlesContext } from "../../../ArticlesContext/ArticlesContext";
import "./Card.scss";
import "../../../Global/GLobalStyles.scss";

const Card = (props) => {
  const { article } = props;
  const ImgUrl = article?.media?.[0]?.["media-metadata"]?.[2].url;
  const { saveArticle, togglePagination } = useContext(ArticlesContext);
  const saveArticleInContext = () => {
    saveArticle(article);
    togglePagination(false);
  };
  return (
    <div className='cardContainer'>
      <Link to='/article' onClick={saveArticleInContext}>
        <img
          className='articleImg'
          src={ImgUrl ? ImgUrl : article.imgUrl ? article.imgUrl : NoImageFount}
        />
        <div className='sectionAndsourceInfo'>
          <span>{article.section}</span>, <span>{article.source}</span> -{" "}
          {article.published_date}
        </div>
        <div className='articleTitle'>{article.title}</div>
        <div className='articleAbstract'>{article.abstract}</div>
        <div className='journalistInfoDiv'>
          <img
            className='journalistImg'
            src='https://preview.colorlib.com/theme/magdesign/images/xperson_1.jpg.pagespeed.ic.Zebptmx_f8.webp'
          />

          <span className='journalistName'>
            {article.byline?.replace("By ", "")}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default Card;
