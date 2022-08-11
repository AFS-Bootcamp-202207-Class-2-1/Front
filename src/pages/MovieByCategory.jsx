import { useState, useEffect } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/less/movieCatagory.less";
import movieCategory from "../assets/iconfont/category.png";
import {
  getMoviesByPage,
  getMoviesByCategory,
  getAllMoviesType,
  getMoviesBySearch,
} from "../api/category";
import { Pagination, Input } from "antd";
const { Search } = Input;

const MovieByCategory = () => {
  const [movieList, setMovieList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getMoviesByPage(1).then((response) => {
      setMovieList(response.data.categoryMovieInfoList);
      setTotal(response.data.totalSize);
    });
    getAllMoviesType().then((response) => {
      setTypeList(response.data);
    });
  }, []);

  const MoviesByCategory = (id, page) => {
    getMoviesByCategory(id, page).then((response) => {
      setMovieList(response.data);
      setTotal(response.data.totalSize);
      setCategoryId(id);
    });
  };

  const getNewMoviesByPage = (page) => {
    if (categoryId == 0) {
      getMoviesByPage(page).then((response) => {
        setMovieList(response.data.categoryMovieInfoList);
        setTotal(response.data.totalSize);
      });
    } else {
      getMoviesByCategory(categoryId, page).then((response) => {
        setMovieList(response.data);
        setTotal(response.data.totalSize);
      });
    }
  };

  const onSearch = (value) => {
    if (value.trim("") !== "") {
      console.log(value);
      let searchValue = {};
      searchValue.name = value;
      searchValue.page = 1;
      searchValue.pageSize = 12;
      getMoviesBySearch(searchValue).then((response) => {
        setMovieList(response.data);
        setTotal(response.data.totalSize);
      });
    } else {
      getMoviesByPage(1).then((response) => {
        setMovieList(response.data.categoryMovieInfoList);
        setTotal(response.data.totalSize);
      });
    }
  };

  return (
    <div>
      <Search
        placeholder="Search movies"
        allowClear
        onSearch={onSearch}
        enterButton
      />
      <div className="category-list">
        <img src={movieCategory} alt="logo" className="movie-images-icon" />
        <div className="type">分类: </div>
        <div className="category-type-list">
          {typeList.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                MoviesByCategory(item.categoryId, 1);
              }}
            >
              <span className="category-content">{item.categoryName}</span>
              <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            </a>
          ))}
        </div>
      </div>
      <div className="movies-category">
        {movieList.length > 0 &&
          movieList.map((item, index) => (
            <div className="movie-item-wrapper" key={index}>
              <NavLink to={`/movies/${item.movieId}`}>
                <img className="movie-img" src={item.movieImage} />
              </NavLink>
              <NavLink to={`/movies/${item.movieId}`}>
                <span className="movie-title">{item.movieName}</span>
              </NavLink>
            </div>
          ))}
      </div>
      <Pagination
        defaultCurrent={1}
        total={total}
        pageSize={12}
        onChange={getNewMoviesByPage}
      />
    </div>
  );
};

export default MovieByCategory;
