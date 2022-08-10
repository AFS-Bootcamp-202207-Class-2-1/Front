import React, { useState } from "react";
import { Card, Row, Col, Modal } from "antd";
import "../assets/less/orderPage.less";
import boy from "../assets/images/boy.png";
import { useEffect } from "react";
import { getTicketInfo } from "../api/ticketInfo";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function OrderPage() {
  const { confirm } = Modal;
  const [ticketInfo, setTicketInfo] = useState();
  // useEffect(() => {
  //   getTicketInfo().then((response) => {
  //     console.log("调用接口");
  //     setTicketInfo(response.data);
  //   });
  // });

  const deleteSelectedTicket = () => {
    console.log("111111111");
  };

  const showDeleteConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除该订单吗？删除后，不可恢复~",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="card">
      <Card title="我的订单">
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Inner Card title"
          hoverable={true}
          extra={<DeleteOutlined onClick={showDeleteConfirm} />}
        >
          <Row gutter={16}>
            <Col span={4}>
              <img src={boy} alt="" className="picture" />
            </Col>
            <Col span={6}>
              <div className="info">
                <div className="name">《绿皮书》</div>
                <div className="address"> CC影城</div>
                <div className="time"> 周日</div>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="price">¥76</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="status">col-6</div>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  );
}
