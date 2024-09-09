import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { compare } from "bcryptjs";

import { useGetUsersQuery } from "@/api/authApiSlice";
import { setItem, currentUserFromEmail } from "@/helpers";

import "./loginPage.sass";

interface LoginFormValues {
  email: string;
  password: string;
}

type SizeType = Parameters<typeof Form>[0]["size"];

const LoginPage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: users = [] } = useGetUsersQuery();
  const [size, setSize] = useState("middle");

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

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onFinish = async (values: LoginFormValues) => {
    const user = currentUserFromEmail(users, values.email);
    if (user && (await compare(values.password, user.password))) {
      setItem(user.id);
      navigate("/");
    } else {
      newError();
    }
  };

  return (
    <div className="login-form-background">
      <div className="login-form__wrapper">
        <Form
          name="LoginForm"
          className="login-form"
          form={form}
          size={size as SizeType}
          initialValues={{
            remember: true,
          }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="email"
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
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Войти
            </Button>
            <Link to="/register">Зарегистрироваться</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
