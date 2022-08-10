import React from 'react';
import { useSelector } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeVisible } from './MovieSlice'

const TicketAnimation = () => {
    const isAnimation = useSelector((state) => state.movies.isVisible)
    const dispatch = useDispatch();
    const disappear = () => {
        dispatch(changeVisible());
    }

    return (
        <div className='parent'>
        <div className={"ticket " + (isAnimation ? "animation":"")} style={{display: isAnimation? "block" : "none"}}>
            <div className='title'>
            <div>
                <Button size='large' type='text' className='cha' onClick={() => {disappear()}} icon={<CloseOutlined />}></Button>
            </div>
            购票成功
            </div>
            <div className='info'>
            <div>1张</div>
            <div>8月8日（周一） 22:35</div>
            <div>CV影城</div>
            <div>原版2D</div>
            <div>1排4座</div>
            </div>
        </div>
    </div>
    );
};

export default TicketAnimation;