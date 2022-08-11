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
    const [categoryId, setCategoryId] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getMoviesByPage(1).then((response) => {
            setMovieList(response.data.categoryMovieInfoList)
            setTotal(response.data.totalSize)
        })
        getAllMoviesType().then((response) => {
            setTypeList(response.data)
        })
    }, [])

    const MoviesByCategory = (id,page) => {
        getMoviesByCategory(id,page).then((response) => {
            setMovieList(response.data)
            setTotal(response.data.totalSize)
            setCategoryId(id);
        })
    }

    const getNewMoviesByPage = (page) => {
        if (categoryId == 0) {
            getMoviesByPage(page).then((response) => {
                setMovieList(response.data.categoryMovieInfoList)
                setTotal(response.data.totalSize)
            })
        } else {
            getMoviesByCategory(categoryId,page).then((response) => {
                setMovieList(response.data)
                setTotal(response.data.totalSize)
            })
        }
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
                            <a key={index} onClick={()=>{ MoviesByCategory(item.categoryId,1) }}>
                                <span className='category-content'>{item.categoryName}</span>
                                <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                            </a>
                        )}
                    <a onClick={()=>{ setCategoryId(0);getNewMoviesByPage(1) }}>全部</a>
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
            <Pagination defaultCurrent={1} total={total} pageSize={12} onChange={getNewMoviesByPage}/>
        </div>
    );
};

export default MovieByCategory;