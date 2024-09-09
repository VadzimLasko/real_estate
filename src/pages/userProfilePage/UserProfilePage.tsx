import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Form, Input, Select } from "antd";

import {
  useGetCurrentUserQuery,
  useDeleteUserMutation,
} from "@/api/authApiSlice.js";
import Spinner from "@/components/spinner/Spinner.js";
import InfoMessage from "@/components/infoMessage/InfoMessage";
import { useTypedSelector } from "@/store";

import { DeleteOutlined } from "@ant-design/icons";
import "./userProfilePage.sass";

const UserProfilePage: FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  if (!slug || slug.trim() === "") {
    return <InfoMessage>Такая страница не существует!</InfoMessage>;
  }
  const navigate = useNavigate();
  const { data: user, isFetching } = useGetCurrentUserQuery(slug);
  const [deleteUser] = useDeleteUserMutation();

  const [form] = Form.useForm();

  const { currentUser } = useTypedSelector((state) => state.user);

  if (!currentUser || !user || currentUser.id !== user.id) {
    return <InfoMessage>Вы не можете просматривать данный профиль</InfoMessage>;
  }

  const handleDeleteUser = async () => {
    if (currentUser && user && currentUser.id === user.id) {
      await deleteUser(currentUser.id);
      navigate("/");
    }
  };

  let { id, password, confirm, ...initialValues } = user;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__wrapper">
        <Form
          form={form}
          name="ediUserForm"
          layout="vertical"
          initialValues={initialValues}
          className="user-profile__form"
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

          <Form.Item>
            <Flex justify="center">
              <Button
                className="registration-form-button"
                type="primary"
                href={`/user/${slug}/edit`}
                htmlType="button"
              >
                Редактировать данные
              </Button>
            </Flex>
          </Form.Item>
          <Flex justify="center">
            <Button onClick={handleDeleteUser}>
              <DeleteOutlined />
              Удалить профиль
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default UserProfilePage;
