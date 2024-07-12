import { FC } from "react";
import { useEffect, useState } from "react";
// import { useHttp } from "../../../hooks/http.hook";
import { useParams } from "react-router-dom";
// import { nanoid } from "@reduxjs/toolkit";

import { Button, Form, Input, Select } from "antd";
import { hash } from "bcryptjs";
import { useTypedSelector } from "@/store";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} from "@/api/authApiSlice.js";
import { User } from "@/types/users";
import Spinner from "@/components/spinner/Spinner.js";

import "./editUserProfilePage.sass";

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

const EditUserProfilePage: FC = () => {
  //   BQYCL8D0OraeAipWQJU3P
  useGetUsersQuery();
  const { slug } = useParams<{ slug?: string }>();
  if (!slug || slug.trim() === "") {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Такая страница не существует!
      </div>
    );
  }
  const { data: user, isFetching } = useGetCurrentUserQuery(slug);
  const [updateUser, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateUserMutation();
  const [successUpdate, setSuccessUpdate] = useState(false);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isSuccess) {
      setSuccessUpdate(true);
      timerId = setTimeout(() => setSuccessUpdate(false), 4000);
    }
    return () => clearTimeout(timerId);
  }, [isSuccess]);

  const [form] = Form.useForm();
  // console.log(isSuccess);

  const { currentUser } = useTypedSelector((state) => state.user);

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  // let sameIsSuccess = isSuccess;

  const answer = <span>Данные успешно обновлены!</span>;

  // const successUpdated = () => {
  //   setTimeout(() => {
  //     return (answer = null);
  //   }, 3000);
  // };

  const { Option } = Select;

  const validateMessages = {
    required: "Необходимо заполнить!",
  };

  // if (isSuccess) {
  //   successUpdated();
  // }

  if (isFetching) {
    return <Spinner />;
  }
  if (!currentUser || !user) {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Вы не можете редактировать этот профиль
      </div>
    );
  }
  //TODO сделать хранение паролей в базе в виде JWT
  const { id, password, ...initialValues } = user;
  const onFinish = async (values: User) => {
    // console.log(isSuccess);
    values.id = id;
    values.password = values.password
      ? await hash(values.password, 10)
      : password;
    delete values.confirm;
    console.log("Received values of form: ", values);
    updateUser({ id, user: values });
    // console.log(isSuccess);
  };
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
    <>
      <div className="registration-form__wrapper">
        <Form
          {...formItemLayout}
          form={form}
          name="ediUserForm"
          layout="vertical"
          validateMessages={validateMessages}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
                required: false,
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
                required: false,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("password") === value) {
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
            {...tailFormItemLayout}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button
              className="registration-form-button"
              type="primary"
              htmlType="submit"
              disabled={isUpdateLoading}
            >
              Сохранить измененения
            </Button>
            {successUpdate ? answer : null}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditUserProfilePage;
