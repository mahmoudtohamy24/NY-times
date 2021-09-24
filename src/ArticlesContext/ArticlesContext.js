/** @format */

import React, { useState, createContext } from "react";
export const ArticlesContext = createContext();
export const ArticlesList = (props) => {
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState([]);
  const [pageNum, changePageNum] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSection, setSectionFilter] = useState("");
  const [showPagination, togglePagination] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, toggleLoading] = useState(true);
  const [article, saveArticle] = useState("");
  //   in this component, I use context API it is like redux where I can add all the entities and use them in the entire app without passing them
  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        sections,
        setSections,
        pageNum,
        changePageNum,
        searchValue,
        setSearchValue,
        selectedSection,
        setSectionFilter,
        showPagination,
        togglePagination,
        errorMsg,
        setErrorMsg,
        loading,
        toggleLoading,
        article,
        saveArticle,
      }}>
      {props.children}
    </ArticlesContext.Provider>
  );
};
