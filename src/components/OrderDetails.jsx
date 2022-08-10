import React from 'react';
import '../assets/less/OrderDetails.less'

const OrderDetails = (props) => {
    const { details, session, count,seatInfo} = props;
    console.log(props)
    return (
        <div className="orderDetails-movie">
            <img className='orderDetails-cover' src={details.movieImage} alt="cover" />
            <div className='orderDetails-introduce'>
                <div className="fs-18 ">{details.movieName}</div>
                <div className="fs-14  mt-20" >{count}张</div>
                <div className="fs-14  ">{session.cinemaMovieTimeWatchtime}</div>
                <div className="fs-14  ">{session.cinemaName}</div>
                <div className="fs-14  ">原版2D</div>
                <div className="fs-14  ">{seatInfo}</div>
                <div className="orderDetails-price">总价： {count * session.cinemaMovieTimePrice}</div>
            </div>
        </div>
    );
};

export default OrderDetails;