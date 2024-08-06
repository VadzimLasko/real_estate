import { FC } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";

import { useGetCurrentUserQuery } from "@/api/authApiSlice.js";
import Spinner from "@/components/spinner/Spinner.js";
import InfoMessage from "@/components/infoMessage/InfoMessage";
import { useTypedSelector } from "@/store";

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
  //   gr_VWKkx8bs15Ajbj66AG
  const { slug } = useParams<{ slug?: string }>();
  if (!slug || slug.trim() === "") {
    return <InfoMessage>Такая страница не существует!</InfoMessage>;
  }
  const { data: user, isFetching } = useGetCurrentUserQuery(slug);

  const [form] = Form.useForm();

  const { currentUser } = useTypedSelector((state) => state.user);

  if (!currentUser || !user) {
    return <InfoMessage>Вы не можете редактировать этот профиль</InfoMessage>;
  }

  let { id, password, confirm, ...initialValues } = user;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__wrapper">
        <Form
          // {...formItemLayout}
          form={form}
          name="ediUserForm"
          layout="vertical"
          initialValues={initialValues}
          style={{
            width: 500,
          }}
          scrollToFirstError
        >
          <Form.Item name="email" label="E-mail">
            <Input disabled className="disable" />
          </Form.Item>

          <Form.Item name="gender" label="Частное лицо или организация?">
            <Select
              disabled
              className="disable"
              placeholder="Вы частное лицо или организация?"
            ></Select>
          </Form.Item>

          <Form.Item
            {...tailFormItemLayout}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button
              className="registration-form-button"
              type="primary"
              href={`/user/${slug}/edit`}
              htmlType="button"
            >
              Редактировать данные
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserProfilePage;
