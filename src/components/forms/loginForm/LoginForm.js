import { useHttp } from "../../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useRef } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import "./loginForm.sass";

const validateMessages = {
  required: "Необходимо заполнить!",
};

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form__wrapper">
      <Form
        name="LoginForm"
        className="login-form"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 22,
        // }}
        // style={{
        //   maxWidth: 600,
        // }}
        initialValues={{
          remember: true,
        }}
        validateMessages={validateMessages}
        // layout="vertical"
        // variant="filled"
        required="true"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="username"
          //   wrapperCol={{
          //     offset: 1,
          //   }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Забыл пароль
          </a>
        </Form.Item>

        <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
          <a href="">Зарегистрироваться</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
