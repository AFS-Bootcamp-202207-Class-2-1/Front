import React from 'react'
import { useState , useEffect} from 'react'
import { Row, Col } from 'antd'
import "../assets/less/SelectSeat.less"
import  unSold from "../assets/images/unsold.png"
import  sold from "../assets/images/sold.png"
import  selected from "../assets/images/select.png"

function SelectSeat(props) {

    const { seatList, showModal, session, details} = props
    seatList.sort((seat1, seat2) => {
        return seat1.seatId - seat2.seatId
    })
    const [seatInfo, setSeatInfo] = useState("还未选择座位")
    const [selectedSeatIds, setSelectedSeatIds] = useState({});
    const [seatInfoTable,setSeatInfoTable] = useState({})
    const [selectedState ] = useState(new Array(24).fill(false))
    const [ count, setCount ] = useState(0);

    const select = (index) => {
        if(seatList[index].seatReserve === false ){
            if(selectedState[index] === false ){
                selectedState[index] = true
                const img = document.getElementById(index);
                img.src = selected; 
                seatInfoTable[index] = `${seatList[index].seatRow + 1}排 ${seatList[index].seatCol + 1}座`
                selectedSeatIds[index] = seatList[index].seatId;
                let message = "";
                Object.keys(seatInfoTable).forEach((key) => {
                    message +="[" + seatInfoTable[key] + "]"+ ",  "; 
                })
                setCount(count + 1);
                message = message.slice(0,message.length - 3);
                setSeatInfo(message)
                
            } else {
                selectedState[index] = false;
                setCount(count - 1);
                const img = document.getElementById(index);
                img.src = unSold; 
                delete seatInfoTable[index]
                delete selectedSeatIds[index]
                let message = "";
                Object.keys(seatInfoTable).forEach((key) => {
                    message +="[" + seatInfoTable[key] + "]"+ ",  ";; 
                })
                message = message.slice(0,message.length - 3);
                if(message.length === 0){
                    setSeatInfo("还未选择座位")
                } else {
                    setSeatInfo(message)
                }
                
            }
        }
    }
    
    return (
        <div className='seat-wapper'>
            <div className='Seat'>
                <div className='title'>{session.cinemaName}</div>
                <div className='seatBody'>
                    <Row gutter={[48,48]} align="middle" >
                        <Col span={4} ><h2>1</h2></Col>
                        {
                            seatList.map((seat,index) => {
                                if(index < 6 ){
                                    return <Col span={3}> <img id={index} src={seatList[index].seatReserve === false ? unSold : sold} alt="" className='seat' onClick={() => select(index)}/></Col>
                                }
                            })
                        }
                    </Row>
                    <Row gutter={[48,48]} align="middle">
                        <Col span={4} ><h2>2</h2></Col>
                        {
                            seatList.map((seat,index) => {
                                if( index >= 6 && index < 12 ){
                                    return <Col span={3}><img id={index} src={seatList[index].seatReserve === false ? unSold : sold} alt="" className='seat' onClick={() => select(index)}/></Col>
                                }
                            })
                        }
                    </Row>
                    <Row gutter={[48,48]} align="middle">
                        <Col span={4} ><h2>3</h2></Col>
                        {
                           seatList.map((seat,index) => {
                            if( index >= 12 && index < 18 ){
                                return <Col span={3}><img id={index} src={seatList[index].seatReserve === false ? unSold : sold} alt="" className='seat' onClick={() => select(index)}/></Col>
                            }
                        })
                        }
                    </Row>
                    <Row gutter={[48,48]} align="middle">
                        <Col span={4} ><h2>4</h2></Col>
                        {
                            seatList.map((seat,index) => {
                                if(index >= 18 && index < 24 ){
                                    return <Col span={3}><img id={index} src={seatList[index].seatReserve === false ? unSold : sold} alt="" className='seat' onClick={() => select(index)}/></Col>
                                }
                            })
                        }
                    </Row>
                </div>
            </div>
            <div className='Ticket'>
                <div className='info'>
                    <div><span>影院:</span> {session.cinemaName}</div>
                    <div><span>版本:</span> {details.movieVersion}</div>
                    <div><span>场次：</span>{session.cinemaMovieTimeWatchtime}</div>
                    <div><span>座位：{seatInfo}</span></div>
                </div>
                <div className='price'>
                    <div>原价：￥{session.cinemaMovieTimePrice} × {count}</div>
                    <div>总计：{count * session.cinemaMovieTimePrice}</div>
                </div>
                <button onClick={() => { showModal(session, seatInfo, count, Object.values(selectedSeatIds)) }}>确认下单</button>
            </div>
        </div>
    )
}

export default SelectSeat
