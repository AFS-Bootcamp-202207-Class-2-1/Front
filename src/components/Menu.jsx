import React from "react";
import { NavLink } from "react-router-dom";
import IndexLogo from "../assets/images/logo.png";
import "../assets/less/menu.less";
import { Col, Row, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <div className="menu-container">
        <Row>
          <Col span={5}>
            <div className="Logo">
              <a href="/">
                <img src={IndexLogo} alt="logo" height="70px" />
                &nbsp;IMovie
              </a>
            </div>
          </Col>
          <Col span={11}>
            <ul className="nav">
              <li>
                <NavLink to="/">首页</NavLink>
              </li>
              <li>
                <NavLink to="/movies">电影</NavLink>
              </li>
              <li>
                <NavLink to="/user">订单</NavLink>
              </li>
            </ul>
          </Col>
          <Col span={3} offset={5}>
            <a href="/login" className="login">
              <Button
                icon={<UserOutlined />}
                shape="circle"
                size="large"
              ></Button>
              {sessionStorage.getItem("user") == null
                ? "登录"
                : JSON.parse(sessionStorage.getItem("user")).userName}
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
