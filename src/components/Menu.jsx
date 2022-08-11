import React from "react";
import { NavLink } from "react-router-dom";
import IndexLogo from "../assets/images/logo.png";
import "../assets/less/menu.less";
import { Col, Row, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import boy from "../assets/images/boy.png";
import girl from "../assets/images/girl.png";

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <div className="menu-container">
        <Row>
          <Col span={5}>
            <div className="Logo">
              <NavLink to="/">
                <img src={IndexLogo} alt="logo" height="70px" />
                &nbsp;IMovie
              </NavLink>
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
            <NavLink to="/login" className="login">
              <Button className="user-btn" shape="circle" size="large">
                {JSON.parse(sessionStorage.getItem("user")) === null ? (
                  <UserOutlined />
                ) : JSON.parse(sessionStorage.getItem("user")).userGender ===
                  "male" ? (
                  <img src={boy} alt="" width="35px" height="35px" />
                ) : (
                  <img src={girl} alt="" width="38px" height="38px" />
                )}
              </Button>
              {sessionStorage.getItem("user") == null
                ? "登录"
                : JSON.parse(sessionStorage.getItem("user")).userName}
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Menu;
