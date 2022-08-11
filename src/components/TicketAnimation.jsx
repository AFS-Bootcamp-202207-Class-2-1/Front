import React from 'react';
import { useSelector } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeVisible } from './MovieSlice'

const TicketAnimation = (props) => {
    const { session, details,seatInfo,count } = props
    const isAnimation = useSelector((state) => state.movies.isVisible)
    const dispatch = useDispatch();
    const disappear = () => {
        dispatch(changeVisible());
    }

    return (
        <div className='parent'>
        <div className={"ticket " + (isAnimation ? "animation":"")} style={{display: isAnimation? "block" : "none"}}>
            <div className='ticket-title'>
                <Button size='large' type='text' className='cha' onClick={() => {disappear()}} icon={<CloseOutlined />}></Button>
                购票成功
            </div>
            <div className='info'>
                <div><span>影院:</span> {session.cinemaName}</div>
                <div><span>版本:</span> {details.movieVersion}</div>
                <div><span>场次：</span>{session.cinemaMovieTimeWatchtime}</div>
                <div><span>座位：{seatInfo}</span></div>
            </div>
            <div className='ticket-price'>
                <div>原价：￥{session.cinemaMovieTimePrice} × {count}</div>
                <div>总计：{count * session.cinemaMovieTimePrice}</div>
            </div>
            {/* <div className='info'>
            <div>1张</div>
            <div>8月8日（周一） 22:35</div>
            <div>CV影城</div>
            <div>原版2D</div>
            <div>1排4座</div>
            </div> */}
        </div>
    </div>
    );
};

export default TicketAnimation;