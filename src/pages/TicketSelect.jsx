import React from 'react';
import '../assets/less/ticketSession.less'
import { useState,useEffect } from 'react';
import { getSessions,getMovieDetail,getSessionSeats } from '../api/ticketSelect'
import { Button,DatePicker } from "antd";
import SelectSeat from '../components/SelectSeat';
import { useParams } from 'react-router-dom'

const TicketSelect = () => {

    const [sessionList,setSessionList] = useState([])
    const [sessionSeats,setSessionSeats] = useState([])
    const [cinemaMovieTimePrice, setCinemaMovieTimePrice] = useState(0)
    const [details,setDetails] = useState({})
    const [isVisible,setIsVisible] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        getMovieDetail(id).then((response) => {
            setDetails(response.data)
        });
         getSessions(id).then(async (response) => {
            await setSessionList(response.data)
            console.log(response.data)
            return response.data
        }).then(async (response)=>{
            await getSessionSeats(response[1].cinemaMovieTimeId).then((response) => {
                console.log(response.data)
                setSessionSeats(response.data)
            })
        })
    }, [])

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const selectSession = (id) => {

        getSessionSeats(id).then((response) => {
            console.log(response.data)
            setSessionSeats(response.data)
        })
    }

    return (
         <div>
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
                                    <Button key={index} value={item} onClick={()=>{ selectSession(item.cinemaMovieTimeId) }}>{item.cinemaName} {item.cinemaMovieTimeWatchtime} {item.cinemaMovieTimeEndtime}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='score'>
                    {details.movieScore}
                </div>
            </div>
         <SelectSeat seatList={sessionSeats}/>
        </div>
    );
};

export default TicketSelect;