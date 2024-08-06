import { FC } from "react";
import { useEffect, useState } from "react";
// import { useHttp } from "../../../hooks/http.hook";
import { useParams } from "react-router-dom";
// import { nanoid } from "@reduxjs/toolkit";

import { Button, Form, Input, Select } from "antd";
import { hash } from "bcryptjs";
import { useTypedSelector } from "@/store";
import {
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} from "@/api/authApiSlice.js";
import { User } from "@/types/users";
import Spinner from "@/components/spinner/Spinner.js";

import "./editUserProfilePage.sass";
import InfoMessage from "@/components/infoMessage/InfoMessage";

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
  //   },div
  // },
};

const EditUserProfilePage: FC = () => {
  //   gr_VWKkx8bs15Ajbj66AG

  const [successUpdate, setSuccessUpdate] = useState(false);

  const { slug } = useParams<{ slug?: string }>();
  if (!slug || slug.trim() === "") {
    return <InfoMessage>Такая страница не существует!</InfoMessage>;
  }
  const { data: user, isFetching } = useGetCurrentUserQuery(slug);
  const [updateUser, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateUserMutation();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isSuccess) {
      setSuccessUpdate(true);
      timerId = setTimeout(() => setSuccessUpdate(false), 4000);
    }
    return () => clearTimeout(timerId);
  }, [isSuccess]);

  const [form] = Form.useForm();
  const { currentUser } = useTypedSelector((state) => state.user);
  const answer = (
    <span className="success-answer">Данные успешно обновлены!</span>
  );
  const { Option } = Select;
  const validateMessages = {
    required: "Необходимо заполнить!",
  };

  if (!currentUser || !user) {
    return <InfoMessage>Вы не можете редактировать этот профиль</InfoMessage>;
  }
  const { id, password, ...initialValues } = user;
  const onFinish = async (values: User) => {
    values.id = id;
    values.password = values.password
      ? await hash(values.password, 10)
      : password;
    delete values.confirm;
    updateUser({ id, user: values })
      .unwrap()
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <div className="edit-user-profile">
        <div className="edit-user-profile__wrapper">
          <Form
            {...formItemLayout}
            form={form}
            name="ediUserForm"
            layout="vertical"
            validateMessages={validateMessages}
            onFinish={onFinish}
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
                className="button"
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
      </div>
    </>
  );
};

export default EditUserProfilePage;
