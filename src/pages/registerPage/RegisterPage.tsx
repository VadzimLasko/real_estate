import { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { hash } from "bcryptjs";

import { useGetUsersQuery, useRegisterMutation } from "@/api/authApiSlice";
import { isCoincidence, setItem } from "@/helpers";
import { User } from "@/types/users";

import "./registerPage.sass";

//TODO добавь страницу соглашения
//TODO поправь очередность импортов
//TODO удали ненужные зависимости
const validateMessages = {
  required: "Необходимо заполнить!",
};

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
  const { Option } = Select;

  const onFinish = async (values: User) => {
    values.id = nanoid();
    values.favorites = [];
    values.password = await hash(values.password, 10);
    delete values.confirm;
    register(values)
      .unwrap()
      .then((response) => {
        if (response) {
          setItem(values.id);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="registration-form">
      <div className="registration-form__wrapper">
        <Form
          {...formItemLayout}
          form={form}
          name="registrationForm"
          layout="vertical"
          validateMessages={validateMessages}
          onFinish={onFinish}
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
              Согласен с условиями{" "}
              <Link to="/agreements" target="_blank">
                соглашения
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            wrapperCol={{ offset: 8, span: 16 }}
          >
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
    </div>
  );
};

export default RegisterPage;
