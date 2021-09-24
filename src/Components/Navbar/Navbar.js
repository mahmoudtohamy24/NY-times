/** @format */

import React, { useContext, useState } from "react";
import { Drawer } from "antd";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { DownOutlined } from "@ant-design/icons";
import { ArticlesContext } from "../../ArticlesContext/ArticlesContext";
import ArticlesActions from "../../Actions/ArticlesActions";
import { Link } from "react-router-dom";
import "./Navbar.scss";

let delay;
const Navbar = (props) => {
  const [showDrawerSection, toggleDrawerSection] = useState(false);
  const {
    setArticles,
    sections,
    setSections,
    changePageNum,
    setSearchValue,
    setSectionFilter,
    selectedSection,
    searchValue,
    togglePagination,
    setErrorMsg,
    toggleLoading,
    article,
    saveArticle,
  } = useContext(ArticlesContext);
  const getSearchValue = (event) => {
    clearTimeout(delay);
    setSearchValue(event.target.value);
    delay = setTimeout(async () => {
      resetContextValues();
      let result = await ArticlesActions.getSearchResults(
        event.target.value,
        0
      );
      saveResult(result);
    }, 700);
  };
  const getLatestArticles = async () => {
    saveArticle(null);
    resetContextValues();
    setSearchValue("");
    togglePagination(false);
    let result = await ArticlesActions.getLatestArticles();
    saveResult(result);
  };
  const saveResult = (result) => {
    toggleLoading(false);
    if (result === "Something went wrong please try again") {
      setErrorMsg(result);
    } else {
      setSections(result.articlesSections);
      setArticles(result.articles);
    }
  };
  const resetContextValues = () => {
    toggleLoading(true);
    changePageNum(0);
    setSectionFilter("");
    togglePagination(true);
    setErrorMsg("");
  };
  const toggleDrawer = () => {
    toggleDrawerSection(!showDrawerSection);
  };
  const removeArticle = () => {
    saveArticle(null);
  };
  {
    /* Here we can search and filter news, and we can go back to the latest news by clicking on the page title  */
  }
  return (
    <div className='navbar-Container'>
      {/* Here I am saying that if there are any selected  article do not show the search field */}
      {!article ? (
        <div className='searchInputContainer'>
          <IoIosSearch />
          <input
            placeholder='Search...'
            onChange={getSearchValue}
            value={searchValue}
          />
        </div>
      ) : (
        <div>
          {/* Here I check if there are any search value so if the user wants to back to the search result just click on it  */}
          {searchValue.length ? (
            <Link to='/'>
              <span className='returnToSearch' onClick={removeArticle}>
                Return to Search page
              </span>
            </Link>
          ) : null}
        </div>
      )}
      {/* I have added the link tag here because if i on the article page and I want to go back to the latest news page  */}
      <Link to='/'>
        <h2 className='pageTitle' onClick={getLatestArticles}>
          New Yourk Times
        </h2>
      </Link>
      <span className='sectionsMenu'>
        <GiHamburgerMenu onClick={toggleDrawer} />
        <Drawer
          title='Articles Category'
          placement={"right"}
          closable={false}
          onClose={toggleDrawer}
          visible={showDrawerSection}>
          {sections.map((section) => (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setSectionFilter(section)}>
              {section}
            </p>
          ))}
          {/* If there any selected filter and I want to clear filters to choose this option */}
          {selectedSection.length ? (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setSectionFilter("")}>
              Clear Filter
            </p>
          ) : null}
        </Drawer>
      </span>
    </div>
  );
};
export default Navbar;
