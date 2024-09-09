import { FC, useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { hash } from "bcryptjs";

import { useGetUsersQuery, useRegisterMutation } from "@/api/authApiSlice";
import { hashCount, isCoincidence, setItem } from "@/helpers";
import { User } from "@/types/users";

import "./registerPage.sass";

type SizeType = Parameters<typeof Form>[0]["size"];

const RegisterPage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();
  const [register, { isLoading }] = useRegisterMutation();
  const [size, setSize] = useState("middle");
  const { Option } = Select;

  const handleResize = () => {
    if (window.innerWidth < 860) {
      setSize("small");
    } else if (window.innerWidth >= 860 && window.innerWidth < 1200) {
      setSize("middle");
    } else {
      setSize("large");
    }
  };

  const validateMessages = {
    required: "Необходимо заполнить!",
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onFinish = async (values: User) => {
    values.id = nanoid();
    values.favorites = [];
    values.password = await hash(values.password, hashCount);
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
        console.error(error);
      });
  };

  return (
    <div className="registration-form">
      <div className="registration-form__wrapper">
        <Form
          form={form}
          name="registrationForm"
          layout="vertical"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={{
            prefix: "375",
          }}
          size={size as SizeType}
          className="registration-form__form"
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
          >
            <Checkbox>
              Согласен с условиями{" "}
              <Link to="/agreements" target="_blank">
                соглашения
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { offset: 8, span: 8 },
              sm: { offset: 9, span: 10 },
            }}
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
