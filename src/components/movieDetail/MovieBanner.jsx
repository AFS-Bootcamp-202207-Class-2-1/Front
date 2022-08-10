import React from 'react';
import '../../assets/less/MovieBanner.less'

const MovieBanner = (props) => {
    const {title, icon} = props;
    return (
        <div>
            <div className="banner-header">
                <img src={require('../../assets/iconfont/detail_comment_icon.png')} alt="logo" className="banner-icon"/>
                <h4>{title}</h4>
            </div>
        </div>
    );
};

export default MovieBanner;