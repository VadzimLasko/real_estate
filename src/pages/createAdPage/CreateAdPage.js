// import { useHttp } from "../../../hooks/http.hook";
import { useCallback } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input, InputNumber } from "antd";
import { authApiSlice } from "@/api/authApiSlice.js";
import {
  useGetUsersQuery,
  useRegisterMutation,
  useGetCurrentUserQuery,
} from "@/api/authApiSlice.js";
import { useCreateAdMutation } from "@/api/adApiSlice.js";
import AddPhoto from "@/components/addPhoto/AddPhoto.js";
import Spinner from "@/components/spinner/Spinner.js";
import MapComponent from "@/components/mapComponent/MapComponent.js";
import { isCoincidence, getItem, currentUserFromId } from "@/utils/utils.js";

import "./createAdPage.sass";

// export const theme = {
//   token: {
//     fontSize: "1.4rem",
//   },
// };

// {
//   /* <ConfigProvider form={{ validateMessages }}>
//   <Form />
// </ConfigProvider>; */
// }

// {
/* <ConfigProvider
  theme={{
    token: {
      fontSize: "1.4rem",
    },
  }}form={{ validateMessages }}
/>; */

// const onFinish = () => {
//   message.success('Submit success!');
// };
// const onFinishFailed = () => {
//   message.error('Submit failed!');
// }

const formItemLayout = {
  labelCol: {
    xs: { span: 22 },
    sm: { span: 22, push: 1 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 22, offset: 1 },
  },
};

const validateMessages = {
  required: "Необходимо заполнить!",
};

const initialValue = {
  title: "", //
  price: "", //
  description: "", //
  square: "", //
  rooms: "", //
  floor: "", //
  name: "", //
  phone: "", //

  //photos
};

const CreateAdPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: users = [], isFetching } = useGetUsersQuery();

  const [createAd] = useCreateAdMutation();

  // const accessID = getItem("accessID");

  // const { data: users = [] } = useGetUsersQuery();
  // const currentUser = currentUserFromId(users, accessID);
  // useEffect(() => {
  //   if (currentUser) {
  //     return;
  //   }

  //   if (!currentUser && accessID) {

  //       const { data: users = [] } = authApiSlice.endpoints.getUsers()
  //     };
  //   }
  // }, []);

  let photos;
  let coordinates;

  const [form] = Form.useForm();

  const onChangePhoto = (files) => {
    photos = files;
  };

  const onChangeCoordinates = (coords) => {
    coordinates = coords;
  };

  const onFinish = (values) => {
    values.id = nanoid();
    values.author = currentUser.email;
    values.photos = photos;
    values.phone = Number("375".concat(`${values.phone}`));
    values.coordinates = coordinates;

    createAd(values)
      .unwrap()
      .then((response) => {
        if (response) {
          console.log("New ad", values);
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  if (isFetching) {
    return <Spinner />;
  }
  if (!currentUser) {
    return (
      <div style={{ margin: "15rem auto 0", width: "25rem" }}>
        Вам нужно авторизоваться
      </div>
    );
  }

  return (
    <div className="add-ad-form__wrapper">
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        // onFinishFailed
        initialValue={initialValue}
        scrollToFirstError
        layout="vertical"
        validateMessages={validateMessages}
        variant="filled"
        required="true"
        name="CreateAd"
      >
        <Form.Item
          label="Заголовок"
          name="address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Адрес"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input showCount maxLength={50} />
        </Form.Item>

        <Form.Item
          name="photos"
          tooltip="Не более 8 фотографий"
          label="Фотографии"
        >
          <AddPhoto showCount maxLength={8} onChangePhoto={onChangePhoto} />
        </Form.Item>

        <Form.Item label="Стоимость" name="price" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            max={10000000}
            addonBefore="$"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Описание объекта"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            autoSize={{
              minRows: 3,
              maxRows: 10,
            }}
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Площадь"
          name="square"
          tooltip="Положительное число от 1 до 1000"
        >
          <InputNumber
            min={1}
            max={1000}
            addonBefore="м2"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Колличество комнат"
          name="rooms"
          tooltip="Положительное число от 1 до 10"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={10} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Этаж"
          tooltip="Положительное число от 1 до 30"
          name="floor"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={30} style={{ width: "100%" }} />
        </Form.Item>

        <MapComponent onChangeCoordinates={onChangeCoordinates} />

        <Form.Item
          name="name"
          label="Ваше имя"
          tooltip="Как Вас называть в объявлении?"
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
          <InputNumber
            addonBefore="+375"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Добавить объявление
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAdPage;
