// import { useHttp } from "../../../hooks/http.hook";
// import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import {
  useGetUsersQuery,
  useRegisterMutation,
  useGetCurrentUserQuery,
} from "@/api/authApiSlice.js";
import { isCoincidence, setItem, currentUserFromEmail } from "@/utils/utils.js";

import "./loginPage.sass";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();

  const validateMessages = {
    required: "Необходимо заполнить!",
  };
  const newError = () => {
    form.setFields([
      {
        name: "email",
        errors: ["Неверный email или пароль!"],
      },
      {
        name: "password",
        errors: [""],
      },
    ]);
  };

  const onFinish = (values) => {
    const isValid =
      isCoincidence(users, "email", values.email) &&
      isCoincidence(users, "password", values.password);
    if (isValid) {
      const user = currentUserFromEmail(users, values.email);
      if (user) {
        setItem("accessID", user.id);
        navigate("/");
      } else {
        newError();
      }
    } else {
      newError();
    }
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
        form={form}
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
          label="E-mail"
          name="email"
          //   wrapperCol={{
          //     offset: 1,
          //   }}
          rules={[
            {
              type: "email",
              message: "Введен неверный E-mail!",
            },
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
          {/* <a className="login-form-forgot" href="">
              Забыл пароль
            </a> */}
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

export default LoginPage;
