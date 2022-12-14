import React from 'react';
import '../assets/less/ticketSession.less'
import { useState,useEffect } from 'react';
import { Button,DatePicker, Modal,message  } from "antd";
import { useParams } from 'react-router-dom'
import { getSessions,getMovieDetail,getSessionSeats,getSessionByDate } from '../api/ticketSelect'
import { postOrder } from '../api/order'
import SelectSeat from '../components/SelectSeat';
import OrderDetails from '../components/OrderDetails'
import TicketAnimation from '../components/TicketAnimation';
import { useDispatch,useSelector } from 'react-redux';
import { changeMapVisible,changeVisible } from '../components/MovieSlice'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const TicketSelect = () => {
    const [sessionList,setSessionList] = useState([])
    const [sessionSeats,setSessionSeats] = useState([])
    const [session, setSession] = useState({});
    const [details,setDetails] = useState({})
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [seatInfo, setSeatInfo] = useState("还未选择座位");
    const [seatIds, setSeatIds] = useState([]);
    const [selectedState, setSelectedState] = useState(new Array(24).fill(false))
    const [selectedSeatIds, setSelectedSeatIds] = useState({});
    const [seatInfoTable,setSeatInfoTable] = useState({})
    const [cinemaSite, setCinemaSite] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate() 
    const isMap = useSelector((state) => state.movies.isMap)
    const { id } = useParams();
    var local = null;
    var map = null;

    useEffect(() => {
        getMovieDetail(id).then(async(response) => {
            setDetails(response.data)
        });
         getSessions(id).then(async (response) => {
            await setSessionList(response.data)
            return response.data
        }).then(async (response)=>{
            await setSession(response[0]) 
            map = new BMapGL.Map("map");
            map.centerAndZoom(new BMapGL.Point(113.581409, 22.378911),11);
            map.enableScrollWheelZoom(true);
            // map.clearOverlays();
            var new_point = new BMapGL.Point(113.581409, 22.378911);
            var marker = new BMapGL.Marker(new_point);  // 创建标注
            map.addOverlay(marker);
            map.panTo(new_point)
            local = new BMapGL.LocalSearch(map, {
                    renderOptions:{map: map}
                });
            local.search(response[0].cinemaName);
            await getSessionSeats(response[0].cinemaMovieTimeId).then((response) => {
                setSessionSeats(response.data)
            })
        })
    }, [])

    const onChange = (date) => {
        getSessionByDate(id, moment(date).format('yyyy-MM-DD')).then((response) => {
            setSessionList(response.data)
        })
    };

    const updateSeatInfo = (message) => {
        setSeatInfo(message)
    }

    const selectSession = async (id, index) => {
        dispatch(changeMapVisible());
        await setSession(sessionList[index])
        setSeatInfo("还未选择座位")
        for(var i = 0; i < selectedState.length; i++){
            selectedState[i] = false;
        }
        setSelectedState([...selectedState]);
        setCinemaSite(sessionList[index].cinemaName);
        map = new BMapGL.Map("map");
        const mapList = { 
            "海上影城(格力海岸店)":{
                "x": 113.627044,
                "y":22.355176 
            },
            "中影红星电影城(唐家店)":{
                "x": 113.605141,
                "y":22.365111 
            },
            "环球星梦国际影城":{
                "x": 113.550343,
                "y":22.386068 
            }
        };
        map.centerAndZoom(new BMapGL.Point(113.581409, 22.378911),11);
        var p1 = new BMapGL.Point(113.581409, 22.378911);
        var driving = new BMapGL.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        var p2 = new BMapGL.Point(mapList[sessionList[index].cinemaName].x,mapList[sessionList[index].cinemaName].y);
        driving.search(p1, p2);
        map.enableScrollWheelZoom(true);
        // map.clearOverlays();
        // var new_point = new BMapGL.Point(113.581409, 22.378911);
        // var marker = new BMapGL.Marker(new_point);  // 创建标注
        // map.addOverlay(marker);
        // map.panTo(new_point)
        
        // local = new BMapGL.LocalSearch(map, {
        //     renderOptions:{map: map}
        //  });
        // local.search(sessionList[index].cinemaName)
        
        await getSessionSeats(sessionList[index].cinemaMovieTimeId).then((response) => {
            setSessionSeats(response.data)
        })
        setCount(0)
    }

    const showModal = (session, seatInfo, count, seatIds) => {
        setSeatInfo(seatInfo)
        setCount(count);
        setVisible(true);
        setSeatIds(seatIds);
        setOrderCount(count);
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

        postOrder(order).then(async(response)=>{
            setVisible(false);
            setConfirmLoading(false);
            dispatch(changeVisible());
            await getSessionSeats(session.cinemaMovieTimeId).then((response) => {
                setSessionSeats(response.data)
            })
            setSeatInfo("还未选择座位")
            setCount(0)
            setSelectedSeatIds({});
            setSeatInfoTable({})
        })
    };
    
    const handleCancel = () => {
        setVisible(false);
    };
    

    return (
         <div>
            <TicketAnimation session={session} details={details} seatInfo={seatInfo} count={orderCount}/>
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
                                    <Button className='session' key={index} value={item} onClick={()=>{ selectSession(item.cinemaMovieTimeId, index) }}>
                                        {item.cinemaName} {item.cinemaMovieTimeWatchtime} ~ {moment(item.cinemaMovieTimeEndtime).format("HH:mm")}
                                    </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='score'>
                    {details.movieScore}
                </div>
            </div>
            <div id="map" style={{display: isMap}}></div>
            <SelectSeat seatList={sessionSeats} showModal={showModal}  session = {session} details= {details} seatInfos = {seatInfo} updateSeatInfo= {updateSeatInfo} selectedState={selectedState} count = {count} setCount = {setCount} selectedSeatIds={selectedSeatIds} seatInfoTable={seatInfoTable}/>
            <Modal
                title="确认订单"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <OrderDetails details= {details} session = { session} count = {orderCount} seatInfo={seatInfo} />
            </Modal>
        </div>
    );
};

export default TicketSelect;