import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Input } from "antd";
import "../assets/less/orderPage.less";
import { useEffect } from "react";
import { getTicketInfo, deleteTicket } from "../api/ticketInfo";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function OrderPage() {
  const { confirm } = Modal;
  const [ticketInfo, setTicketInfo] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTicketInfo(
        JSON.parse(sessionStorage.getItem("user")).userId
      );
      setTicketInfo(data);
    };
    fetchData();
  }, []);

  const deleteSelectedTicket = (id) => {
    deleteTicket(id).then(async () => {
      const { data } = await getTicketInfo(
        JSON.parse(sessionStorage.getItem("user")).userId
      );
      setTicketInfo(data);
    });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "您确定要退票吗？",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        deleteSelectedTicket(id);
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="card">
      <Card title="我的订单" className="title">
        {ticketInfo.map((item, index) => {
          return (
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={
                <div>
                  <span className="buyTime">
                    {ticketInfo[index].ticketBuytime.substring(0, 10)}
                  </span>
                  <span className="ticketNumber">
                    {"imovie订单号:" + ticketInfo[index].ticketUuid}
                  </span>
                </div>
              }
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
                <Col className="gutter-row" span={6}>
                  <Button type="primary" onClick={showModal}>
                    Comment
                  </Button>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Card>
      <Modal
        title="Comment"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Please input your comment" />
      </Modal>
    </div>
  );
}
