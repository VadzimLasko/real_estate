// import { useHttp } from "../../../hooks/http.hook";
// import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useRef } from "react";

import { Button, Form, Input, InputNumber } from "antd";

// import { adCreated } from "../../adsList/adsSlice";
import AddPhoto from "@/components/addPhoto/AddPhoto.js";

import "./editAdPage.sass";

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
    title: "",
    price: "",
    description: "",
    square: "",
    rooms: "",
    floor: "",
};

const EditAdPage = (props) => {
    let photos = {};
    // const dispatch = useDispatch();
    // const { request } = useHttp();
  
    // const [form] = Form.useForm();
    const form = useRef(null);
  
    const onChangePhoto = (files) => {
      photos = files;
    };
  
    const onFinish = (values) => {
      values.id = nanoid();
      values.author = "Vadik";
      values.photos = photos;
      values.coordinates = "01 01 01";
    //   request("http://localhost:3001/ads", "POST", JSON.stringify(values))
    //     .then((res) => console.log(res, "Отправка успешна"))
    //     .then(dispatch(adCreated(values)))
    //     .catch((err) => console.log(err));
  
      // Очищаем форму после отправки
      // form.resetFields();
      form.current.resetFields();
    };
  
    return (
      <div className="add-ad-form__wrapper">
        <Form
          form={form.current}
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
  
          <Form.Item wrapperCol={{ offset: 9 }}>
            <Button type="primary" htmlType="submit">
              Добавить объявление
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};
 
export default EditAdPage;
