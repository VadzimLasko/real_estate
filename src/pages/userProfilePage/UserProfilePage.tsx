import { FC } from "react";
// import { useHttp } from "../../../hooks/http.hook";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { Button, Checkbox, Form, Input, Select } from "antd";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} from "@/api/authApiSlice.js";
import Spinner from "@/components/spinner/Spinner.js";

import { isCoincidence, setItem } from "@/helpers/utils.js";

import "./userProfilePage.sass";

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

const UserProfilePage: FC = () => {
  //   BQYCL8D0OraeAipWQJU3P
  useGetUsersQuery();
  let { slug } = useParams();
  const { data: user, isFetching } = useGetCurrentUserQuery(slug);
  const [updateUser, { isFetching: isUpdateFetching }] =
    useUpdateUserMutation();
  const [form] = Form.useForm();

  const { currentUser } = useSelector((state) => state.user);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  const validateMessages = {
    required: "Необходимо заполнить!",
  };

  if (isFetching) {
    return <Spinner />;
  }
  if (!currentUser) {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Вы не можете редактировать этот профиль
      </div>
    );
  }

  let { id, password, confirm, ...initialValues } = user;
  // const initialPhotos = photos ? photos : [];
  // const initialCoordinates = coordinates ? coordinates : [];
  console.log(initialValues);

  //   id(pin):"BQYCL8D0OraeAipWQJU3P"
  // email(pin):"2me@mydomain.com"
  // password(pin):"2"
  // confirm(pin):"2"
  // gender(pin):"организация"
  // agreement(pin):true

  return (
    <div className="registration-form__wrapper">
      <Form
        // {...formItemLayout}
        form={form}
        name="ediUserForm"
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
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
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Изменить пароль"
          rules={[
            {
              required: true,
              // message: "Введен неверный Пароль!",
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
          name="name"
          label="Имя"
          tooltip="Как Вас называть?"
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            addonBefore="+"
            style={{
              width: "100%",
            }}
          />
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

        {/* <Form.Item
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
            Согласен с условиями <a href="">соглашения</a>
          </Checkbox>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout} wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            className="registration-form-button"
            type="primary"
            htmlType="submit"
            disabled
          >
            Сохранить измененения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfilePage;
