import React, { useState } from "react";
import { Card, Row, Col, Modal } from "antd";
import "../assets/less/orderPage.less";
import { useEffect } from "react";
import { getTicketInfo, deleteTicket } from "../api/ticketInfo";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function OrderPage() {
  const { confirm } = Modal;
  const [ticketInfo, setTicketInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTicketInfo(JSON.parse(sessionStorage.getItem("user")).userId);
      setTicketInfo(data);
    };
    fetchData();
  }, []);

  const deleteSelectedTicket = () => {
    // deleteTicket().then(() => {
    //   console.log("调用删除接口");
    // });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除该订单吗？删除后，不可恢复~",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        console.log("OK");
        deleteSelectedTicket();
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="card">
      <Card title="我的订单">
        {ticketInfo.map((item, index) => {
          return (
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={`${ticketInfo[index].ticketBuytime.substring(0, 10)} 
                imovie订单号:    
                ${ticketInfo[index].ticketUuid}`}
              hoverable={true}
              extra={
                <DeleteOutlined
                  onClick={() => {
                    showDeleteConfirm(ticketInfo[index].ticketId);
                  }}
                />
              }
              key={index}
            >
              <Row gutter={16}>
                <Col span={4}>
                  <img
                    src={ticketInfo[index].movieImage}
                    alt=""
                    className="picture"
                  />
                </Col>
                <Col span={6}>
                  <div className="info">
                    <div className="name">
                      《{ticketInfo[index].movieName}》
                    </div>
                    <div className="address">
                      {ticketInfo[index].cinemaName}
                    </div>
                    <div className="address">{ticketInfo[index].seatInfo}</div>
                    <div className="time">
                      {ticketInfo[index].cinemaMovieTimeWatchtime}
                    </div>
                  </div>
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className="price">¥{ticketInfo[index].ticketPrice}</div>
                </Col>
                {/* <Col className="gutter-row" span={6}>
                  <div className="status">col-6</div>
                </Col> */}
              </Row>
            </Card>
          );
        })}
      </Card>
    </div>
  );
}
