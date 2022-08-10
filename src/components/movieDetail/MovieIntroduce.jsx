import React from 'react';
import detail_introduce_icon from '../../assets/iconfont/detail_introduce_icon.png'

const MovieIntroduceHeader = (props) => {
    const {movie} = props;
    return (
        <div>
            <div className="movie-introduce-header">
                <img src={detail_introduce_icon} alt="logo" className="movie-introduce-icon"/>
                <h4>剧情简介</h4>
            </div>
            <div className="movie-introduce-body">
                {movie.movieIntroduce}
            </div>
        </div>
    );
};

export default MovieIntroduceHeader;