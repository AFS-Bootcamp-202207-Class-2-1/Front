import React, { useState } from "react";
import iMovieLogo from "../assets/images/logo.png";
import user from "../assets/iconfont/user.png";
import boy from "../assets/images/boy.png";
import girl from "../assets/images/girl.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Upload, Modal, message } from "antd";
import { userRegister } from "../api/register";
import "../assets/less/register.less";
import { useNavigate } from "react-router-dom";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Register() {
  const navigate = useNavigate();

  const success = () => {
    message.success("Registered successfully");
  };

  const error = () => {
    message.error("The user already exists");
  };

  const onFinish = async function (values) {
    const response = await userRegister(values);
    if (response.data === "registered successfully") {
      success();
      navigate("/login");
    } else {
      error();
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <div className="parent">
      <div className="logo">
        <img src={iMovieLogo} alt="" width="300px" height="300px" />
        <h1 className="description">iMovie</h1>
      </div>
      <div className="register_form">
        <h2 className="title">
          <img src={user} alt="" width="65px" height="63px" />
          Register
        </h2>
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          {...formItemLayout}
        >
          <Form.Item
            name="usersName"
            label="UserName"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="usersPassword"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["usersPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("usersPassword") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="usersGender"
            rules={[
              {
                required: true,
                message: "Please select your Gender!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">
                <img src={boy} alt="" width="50px" height="50px" />
              </Radio>
              <Radio value="female">
                <img src={girl} alt="" width="50px" height="50px" />
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
