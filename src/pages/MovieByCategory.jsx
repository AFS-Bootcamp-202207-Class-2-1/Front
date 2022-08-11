import { useState,useEffect } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom'
import '../assets/less/movieCatagory.less';
import movieCategory from '../assets/iconfont/category.png';
import { getMoviesByPage,getMoviesByCategory,getAllMoviesType } from '../api/category';
import { Pagination } from "antd";

const MovieByCategory = () => {
    const [movieList, setMovieList] = useState([]);
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        getMoviesByPage(1).then((response) => {
            setMovieList(response.data)
        })
        getAllMoviesType().then((response) => {
            setTypeList(response.data)
        })
    }, [])

    const getNewMoviesByPage = (id,page) => {
        getMoviesByCategory(id,page).then((response) => {
            setMovieList(response.data)
        })
    }

    const MoviesByCategory = (id) => {
        getMoviesByCategory(id,1).then((response) => {
            setMovieList(response.data)
        })
    }

    return (
        <div>
            <div className="category-list">
                <img src={movieCategory} alt="logo" className="movie-images-icon"/>
                <div className='type'>
                    分类: </div>
                <div className="category-type-list">
                    {
                        typeList.map((item,index) => 
                            <a key={index} onClick={()=>{ getNewMoviesByPage(item.categoryId,1) }}>
                                <span className='category-content'>{item.categoryName}</span>
                                <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                            </a>
                        )}
                </div>
            </div>
            <div className="movies-category">
                {
                    movieList.length > 0 && movieList.map((item,index) => 
                        <div className="movie-item-wrapper" key={index}>
                        <NavLink to={`/movies/${item.movieId}`}><img className='movie-img' src={item.movieImage} /></NavLink>
                        <NavLink to={`/movies/${item.movieId}`}><span className='movie-title'>{item.movieName}</span></NavLink>
                        </div>
                )}
            </div>
            <Pagination defaultCurrent={1} total={50} pageSize={12} onChange={getNewMoviesByPage}/>
        </div>
    );
};

export default MovieByCategory;