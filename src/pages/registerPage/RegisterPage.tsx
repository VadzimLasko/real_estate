// import { useHttp } from "../../../hooks/http.hook";
import { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
// import { hash } from "bcrypt";
// import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input, Select } from "antd";
import { useGetUsersQuery, useRegisterMutation } from "@/api/authApiSlice";

import { isCoincidence, setItem } from "@/helpers";
import { User } from "@/types/users";

import "./registerPage.sass";

import { hash } from "bcryptjs";
//TODO добавь страницу соглашения
//TODO удали uuid И reselect из зависимостей
const validateMessages = {
  required: "Необходимо заполнить!",
};

const { Option } = Select;

const formItemLayout = {
  // labelCol: {
  //   xs: {
  //     span: 24,
  //   },
  //   sm: {
  //     span: 10,
  //   },
  // },
  // wrapperCol: {
  //   xs: {
  //     span: 24,
  //   },
  //   sm: {
  //     span: 16,
  //   },
  // },
};
const tailFormItemLayout = {
  // wrapperCol: {
  //   xs: {
  //     span: 24,
  //   },
  //   sm: {
  //     span: 16,
  //   },
  // },
};

const RegisterPage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();

  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: User) => {
    values.id = nanoid();
    values.favorites = [];
    values.password = await hash(values.password, 10);
    delete values.confirm;
    register(values)
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(values);
          setItem(values.id);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const onFinish = (values) => {
  //   register(values)
  //     .unwrap()
  //     .then(() => isSuccess ? redirect("/") : null);
  // };

  // const onFinish = async (values) => {

  //   await register(values).unwrap();
  //   console.log('isSuccess', isSuccess);

  //   if (isSuccess) {
  //     navigate("/");
  //   };

  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo)
  // };

  return (
    <div className="registration-form__wrapper">
      <Form
        {...formItemLayout}
        form={form}
        name="registrationForm"
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        initialValues={{
          prefix: "375",
        }}
        style={{
          width: 500,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Введен неверный E-mail!",
            },
            {
              required: true,
            },
            {
              validator(_, value) {
                if (!value || !isCoincidence(users, "email", value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Такой email уже зарегистрирован!")
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: "Введен неверный Пароль!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Частное лицо или организация?"
          rules={[
            {
              required: true,
              message: "Необходимо выбрать",
            },
          ]}
        >
          <Select placeholder="Вы частное лицо или организация?">
            <Option value="частное лицо">Частное лицо</Option>
            <Option value="организация">Организация</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Необходимо принять условия соглашения")
                    ),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Согласен с условиями <a href="/">соглашения</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout} wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            className="registration-form-button"
            type="primary"
            htmlType="submit"
            disabled={isLoading}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
