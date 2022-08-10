import React from 'react';
import { Rate } from 'antd'
import '../../assets/less/MovieDetails.less'

const MovieDetails = (props) => {
    const { movie } = props;
    return (
        <div className="Detail-Movie">
            <img className='movie-cover' src={movie.movieImage} alt="cover" />
            <div className="DetailIntroduce">
                <div className="fs-20 black-1 movie-name">{movie.movieName}</div>
                <div className="fs-18 black-1 mt-28" >{movie.movieCatagory}</div>
                <div className="fs-14 black-1 mt-20">片长： {movie.movieTime}分钟</div>
                <Rate allowHalf disabled  count={5} defaultValue={2.5}  value={movie.movieScore /10} className="mt-13"/>
                <div className="fs-14 black-1 mt-20">主演： {movie.moviePerformers}</div>
                <a href={`/ticket/${movie.movieId}`}><button className="button mt-28">立马购票</button></a>
            </div>
        </div>
    );
};

export default MovieDetails;