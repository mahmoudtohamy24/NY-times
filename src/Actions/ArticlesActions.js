/** @format */

import axios from "axios";

class ArticlesActions {
  getLatestArticles = async () => {
    // here I get the latest articles and then get their sections

    try {
      let result = await axios.get(
        "https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=1c5pAbZ9C0SHBxrraIbEoe4CGNGnANif"
      );
      let articles = result.data.results;
      articles = articles.map((article) => {
        article.multimedia = article.multimedia;

        return article;
      });
      let articlesSections = this.getArticlesSections(articles);
      let state = { articles, articlesSections };

      return state;
    } catch {
      return "Some thing went wrong please try again";
    }
  };
  getSearchResults = async (searchValue, pageNum) => {
    try {
      // Here I get all the articles from search API, then adjust the data to be like the data coming from the latest articles API, and then get their sections
      let result = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchValue}?p=${pageNum}&api-key=1c5pAbZ9C0SHBxrraIbEoe4CGNGnANif`
      );
      let articles = result.data.response.docs;
      articles = articles.map((article) => {
        article["section"] = article.section_name;
        article.imgUrl = article.multimedia[0]
          ? "https://static01.nyt.com/" + article.multimedia[0].url
          : null;
        article.title = article.headline.main;
        article.byline = article.byline.original;
        article.published_date = new Date(article.pub_date);
        article.published_date = article.published_date.toLocaleDateString();
        return article;
      });
      let articlesSections = this.getArticlesSections(articles);
      let state = { articles, articlesSections };
      return state;
    } catch (error) {
      return "Something went wrong please try again";
    }
  };
  getArticlesSections = (articles) => {
    //  Here I get the sections of the articles and return them so that I can filter them depending on it
    let articlesSections = [];
    articles.forEach((artical) => {
      if (!articlesSections.includes(artical.section)) {
        articlesSections = [...articlesSections, artical.section];
      }
    });
    return articlesSections;
  };
}

export default new ArticlesActions();
