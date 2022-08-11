import React from 'react';
import '../assets/less/ticketSession.less'
import { useState,useEffect } from 'react';
import { Button,DatePicker, Modal,message  } from "antd";
import { useParams } from 'react-router-dom'
import { getSessions,getMovieDetail,getSessionSeats } from '../api/ticketSelect'
import { postOrder } from '../api/order'
import SelectSeat from '../components/SelectSeat';
import OrderDetails from '../components/OrderDetails'
import TicketAnimation from '../components/TicketAnimation';
import { useDispatch } from 'react-redux';
import { changeVisible } from '../components/MovieSlice'
import { useNavigate } from 'react-router-dom';


const TicketSelect = () => {

    const [sessionList,setSessionList] = useState([])
    const [sessionSeats,setSessionSeats] = useState([])
    const [session, setSession] = useState({});
    const [details,setDetails] = useState({})
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [seatInfo, setSeatInfo] = useState("还未选择座位");
    const [seatIds, setSeatIds] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate() 

    const { id } = useParams();

    useEffect(() => {
        getMovieDetail(id).then(async(response) => {
            setDetails(response.data)
        });
         getSessions(id).then(async (response) => {
            await setSessionList(response.data)
            return response.data
        }).then(async (response)=>{
            await setSession(response[1])
            await getSessionSeats(response[1].cinemaMovieTimeId).then((response) => {
                setSessionSeats(response.data)
            })
        })
    }, [])

    const error = () => {
        message.error("请登录后购票");
      };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const updateSeatInfo = (message) => {
        setSeatInfo(message)
    }

    const selectSession = (id, index) => {
        setSession(sessionList[index])
        setSeatInfo("还未选择座位")
        getSessionSeats(id).then((response) => {
            setSessionSeats(response.data)
        })
    }

    const showModal = (session, seatInfo, count, seatIds) => {
        setSeatInfo(seatInfo)
        setCount(count);
        setVisible(true);
        setSeatIds(seatIds);
      };
    
    const handleOk = () => {
        setConfirmLoading(true);
        if(sessionStorage.getItem("user") === null){
            navigate('/login');
            error()
        }
        const usersId = parseInt(JSON.parse(sessionStorage.getItem("user")).userId)
        const ticketPrice = session.cinemaMovieTimePrice * count;
        const movieId = details.movieId
        const cinemaId = session.cinemaId
        const cinemaMovieTimeId = session.cinemaMovieTimeId
        const boughtSeatIdList = seatIds
        const order = { ticketPrice, usersId, cinemaId,movieId, cinemaMovieTimeId, boughtSeatIdList }

        postOrder(order).then((response)=>{
            console.log(response)
            setVisible(false);
            setConfirmLoading(false);
            dispatch(changeVisible());
            getSessions(id).then(async (response) => {
                await setSessionList(response.data)
                return response.data
            }).then(async (response)=>{
                await setSession(response[1])
                await getSessionSeats(response[1].cinemaMovieTimeId).then((response) => {
                    setSessionSeats(response.data)
                })
            })
        })
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    

    return (
         <div>
            <TicketAnimation session={session} details={details} seatInfo={seatInfo} count={count}/>
            <div className="Detail-Movie">
                <img className='movie-cover' src={details.movieImage} alt="cover" />
                <div className="DetailIntroduce">
                    <div className="fs-20 black-1 movie-name">{details.movieName}</div>
                    <div className="fs-18 black-1 mt-28">{details.movieCatagory}</div>
                    <div className="fs-14 black-1 mt-20">时长： {details.movieTime} 分钟</div>
                    <div className="fs-14 black-1 mt-20">主演： {details.moviePerformers}</div>
                    <div className="fs-14 black-1 mt-20 session-container">场次：<DatePicker onChange={onChange} />
                        <div className='session-selector'>
                            {
                                sessionList.map((item,index) => (
                                    <Button key={index} value={item} onClick={()=>{ selectSession(item.cinemaMovieTimeId, index) }}>{item.cinemaName} {item.cinemaMovieTimeWatchtime} {item.cinemaMovieTimeEndtime}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='score'>
                    {details.movieScore}
                </div>
            </div>
            <SelectSeat seatList={sessionSeats} showModal={showModal}  session = {session} details= {details} seatInfos = {seatInfo} updateSeatInfo= {updateSeatInfo} />
            <Modal
                title="确认订单"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <OrderDetails details= {details} session = { session} count = {count} seatInfo={seatInfo}/>
            </Modal>
        </div>
    );
};

export default TicketSelect;