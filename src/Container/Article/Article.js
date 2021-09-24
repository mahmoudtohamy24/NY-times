/** @format */

import React, { useContext, useEffect } from "react";
import { ArticlesContext } from "../../ArticlesContext/ArticlesContext";
import NoImageFount from "../../Assets/Images/no-image-found-360x260.png";
import Navbar from "../../Components/Navbar/Navbar";
import "../../Global/GLobalStyles.scss";
import "./Article.scss";
const Article = () => {
  const { article } = useContext(ArticlesContext);
  const ImgUrl = article?.media?.[0]?.["media-metadata"]?.[2].url;
  useEffect(() => {
    // here I check if there are no selected articles just replace the URL and I can use also router redirect and I use this
    // logic because if the user wherein the article page and refreshed the page and in this case, I have looked for any API that gets a single article and I did not find anyone
    // and I can use the local session to store the data of selected article to store the data in it if the user refresh
    if (!article) {
      window.location.replace("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className='articleBody'>
        <h1 className='articleTitle'>{article.title}</h1>
        <img
          className='articleImg'
          src={ImgUrl ? ImgUrl : article.imgUrl ? article.imgUrl : NoImageFount}
        />
        <div className='sectionAndsourceInfo'>
          <span>{article.section}</span>, <span>{article.source}</span> -{" "}
          {article.published_date}
        </div>
        <div className='articleAbstract'>{article.abstract}</div>
      </div>
    </div>
  );
};
export default Article;
