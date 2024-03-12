import { useHttp } from "../../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { Button, Form, Input, InputNumber } from "antd";

import { adCreated } from "../../adsList/adsSlice";
import AddPhoto from "../formElements/AddPhoto";

import "./addAdForm.sass";

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

export const validateMessages = {
  required: "Необходимо заполнить!",
};

const initialValue = {
  title: "",
  price: "",
  description: "",
  square: "",
  rooms: "",
  floor: "",
};

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

const AddAdForm = () => {
  let photos = {};
  const dispatch = useDispatch();
  const { request } = useHttp();

  const [form] = Form.useForm();

  const onChangePhoto = (files) => {
    photos = files;
  };

  const onFinish = (values) => {
    values.id = nanoid();
    values.author = "Vadik";
    values.photos = photos;
    values.coordinates = "01 01 01";
    request("http://localhost:3001/ads", "POST", JSON.stringify(values))
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(adCreated(values)))
      .catch((err) => console.log(err));

    // Очищаем форму после отправки
    form.resetFields();
  };

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
        name="AddAdForm"
        // style={{
        //   maxWidth: 700,
        //   margin: "0 auto",
        //   borderRadius: "50",
        //   outlineColor: "#000000",
        // }}
      >
        <Form.Item
          label="Заголовок"
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
          <AddPhoto showCount maxLength={50} onChangePhoto={onChangePhoto} />
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

        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Добавить объявление
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAdForm;
