import React from 'react';
import { Carousel } from 'antd' 
import Banner01 from '../../assets/images/banner01.jpg'
import Banner02 from '../../assets/images/banner02.jpg'
import Banner03 from '../../assets/images/banner03.jpg'
import Banner04 from '../../assets/images/banner04.jpg'

const Banner = () => {
    return (
        <div className='carousel-wrapper'>
            <Carousel autoplay dotPosition='bottom'>
                <div className='pic'>
                    <img className='banner' src={Banner01} />
                </div>
                <div className='pic'>
                    <img className='banner' src={Banner02} />
                </div>
                <div className='pic'>
                    <img className='banner' src={Banner03} />
                </div>
                <div className='pic'>
                    <img className='banner' src={Banner04} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
