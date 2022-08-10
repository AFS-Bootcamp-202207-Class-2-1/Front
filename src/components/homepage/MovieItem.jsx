import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieItem = (props) => {
    const {value} = props
    const movieIntroduction = value.movieIntroduce
    
    return (
        <div className='movie-item'>
            <NavLink to={`/movies/${value.movieId}`}><img className='movie-img' src={value.movieImage} /></NavLink>
            <div className='movie-description'>
                <div className='title-row'>
                <NavLink to={`/movies/${value.movieId}`}><span className='movie-name'>{value.movieName}</span></NavLink>
                    <span className='movie-rating'>{value.movieScore}</span>
                </div>
                <div className='movie-introduction'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{movieIntroduction.length > 90 ? movieIntroduction.slice(0,90) + '...' : movieIntroduction}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;