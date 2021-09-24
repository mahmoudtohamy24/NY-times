/** @format */

import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { ArticlesContext } from "../../ArticlesContext/ArticlesContext";
import NewsCards from "../../Components/NewsCards/NewsCards";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";
import "./HomePage.scss";
const HomePage = (props) => {
  const { showPagination, errorMsg, loading } = useContext(ArticlesContext);
  return (
    <div className='homePageContainer'>
      <Navbar />{" "}
      {loading ? (
        <Loader />
      ) : errorMsg.length ? (
        <div className='errorMsg'>{errorMsg}</div>
      ) : (
        <>
          <NewsCards />
          {console.log(">>>>>>showPagination", showPagination)}
          {showPagination && <Pagination />}
        </>
      )}
    </div>
  );
};
export default HomePage;
