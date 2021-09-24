/** @format */

import React, { useContext } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { ArticlesContext } from "../../ArticlesContext/ArticlesContext";
import ArticlesActions from "../../Actions/ArticlesActions";
import "./Pagination.scss";
const Pagination = () => {
  const {
    setArticles,
    setSections,
    searchValue,
    pageNum,
    changePageNum,
    setSectionFilter,
    toggleLoading,
  } = useContext(ArticlesContext);
  const adjustPageNum = async (num) => {
    toggleLoading(true);
    changePageNum(pageNum + num);
    let result = await ArticlesActions.getSearchResults(
      searchValue,
      pageNum + num
    );
    toggleLoading(false);
    setSectionFilter("");
    setSections(result.articlesSections);
    setArticles(result.articles);
  };
  return (
    <div className='paginationContainer'>
      {pageNum !== 0 && <FaArrowCircleLeft onClick={() => adjustPageNum(-1)} />}{" "}
      <span>{pageNum}</span>{" "}
      <FaArrowCircleRight onClick={() => adjustPageNum(1)} />
    </div>
  );
};
export default Pagination;
