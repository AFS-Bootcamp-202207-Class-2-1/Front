import { useState,useEffect } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom'
import '../assets/less/movieCatagory.less';
import movieCategory from '../assets/iconfont/category.png';
import { getMovies } from '../api';
import { Pagination } from "antd";

const MovieByCategory = () => {
    const [movieList, setMovieList] = useState([]);
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        getMovies().then((response) => {
            setMovieList(response.data)
        })
    }, [])

    const getNewMoviesByPage = (pageSize) => {
        console.log(pageSize)
    }

    return (
        <div>
            <div className="category-list">
                <img src={movieCategory} alt="logo" className="movie-images-icon"/>
                <span className='type'>分类: </span>
                <span className='category-content'>
                    {/* {
                        typeList.map((item,index) => 
                            <div className="" key={index}>
                                <span>{item.type}</span>
                            </div>
                    )} */}
                    <a>
                    爱情  |   喜剧  |   动画  |   剧情  |   恐怖  |   惊悚  |   科幻  |   动作  |   悬疑  |   犯罪  |   冒险  |   战争  |   武侠  |   历史  |   传记  |   歌舞
                    纪录片  |  音乐  |  灾难  |  青春  |  儿童  |  其他</a>
                </span>
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