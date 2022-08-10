import React from 'react'
import { useState , useEffect} from 'react'
import { Row, Col } from 'antd'
import "../assets/less/SelectSeat.less"
import  unSold from "../assets/images/unsold.png"
import  sold from "../assets/images/sold.png"
import  selected from "../assets/images/select.png"
import { getSeats } from "../api/login"


function SelectSeat(props) {

    const { seatList } = props
    seatList.sort((seat1, seat2) => {
        return seat1.seatId - seat2.seatId
    })
    const [seatInfo, setSeatInfo] = useState("还未选择座位")
    const [seatInfoTable,setSeatInfoTable] = useState({})
    const [selectedState ] = useState(new Array(24).fill(false))

    const select = (index) => {
        if(seatList[index].seatReserve === false ){
            if(selectedState[index] === false ){
                selectedState[index] = true
                const img = document.getElementById(index);
                img.src = selected; 
                seatInfoTable[index] = `${seatList[index].seatRow + 1}行 ${seatList[index].seatCol + 1}列`
                let message = "";
                Object.keys(seatInfoTable).forEach((key) => {
                    message +="[" + seatInfoTable[key] + "]"+ ",  "; 
                })
                message = message.slice(0,message.length - 2);
                setSeatInfo(message)
                
            } else {
                selectedState[index] = false;
                const img = document.getElementById(index);
                img.src = unSold; 
                delete seatInfoTable[index];
                let message = "";
                Object.keys(seatInfoTable).forEach((key) => {
                    message +=seatInfoTable[key] + ", "; 
                })
                message = message.slice(0,message.length - 2);
                setSeatInfo(message)
            }
        }
    }
    
    return (
        <div className='seat-wapper'>
            <div className='Seat'>
                <div className='title'>111</div>
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
                    <div><span>影院:</span> CV影院</div>
                    <div><span>版本:</span> 原版2D</div>
                    <div><span>场次：</span>8月8日（周一） 22：35</div>
                    <div><span>座位：{seatInfo}</span></div>
                </div>
                <div className='price'>
                    <div>原价：￥43.00 × 1</div>
                    <div>总计：</div>
                </div>
                <button>确认下单</button>
            </div>
        </div>
        
    )
}

export default SelectSeat
